package com.kao.omnicom.backend.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.exception.ConflictException;
import com.github.dockerjava.api.exception.NotFoundException;
import com.github.dockerjava.api.model.Bind;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.core.command.AttachContainerResultCallback;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;

import com.kao.omnicom.backend.entity.OutputResponse;
import com.kao.omnicom.backend.services.TerminalService;

import java.io.*;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
public class TerminalServiceDocker implements TerminalService {

    private final DockerClientConfig defaultConfig = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
    private final DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
            .dockerHost(defaultConfig.getDockerHost())
            .sslConfig(defaultConfig.getSSLConfig())
            .maxConnections(100)
            .build();
    private final DockerClient client = DockerClientImpl.getInstance(defaultConfig, httpClient);

    private final Logger logger = Logger.getLogger("TerminalServiceDocker");

    private String readContainerFile(String containerId, String path) {
        try {
            InputStream archive = client.copyArchiveFromContainerCmd(containerId, path).exec();

            TarArchiveInputStream tar = new TarArchiveInputStream(archive);
            TarArchiveEntry currentEntry = tar.getNextTarEntry();
            BufferedReader br;
            StringBuilder sb = new StringBuilder();
            while (currentEntry != null) {
                br = new BufferedReader(new InputStreamReader(tar));
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line).append('\n');
                }
                currentEntry = tar.getNextTarEntry();
            }

            return sb.toString();
        } catch (NotFoundException e) {
            logger.log(Level.WARNING, "File " + path + " not found in container");
            return "";
        } catch (IOException e) {
            logger.log(Level.WARNING, e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private OutputResponse readContainerOutput(String containerId) {
        OutputResponse response = new OutputResponse();
        response.setContainerId(null);
        response.setWaitingForInput(false);
        final int maxRetries = 5;
        final int sleepDelta = 100;

        for (int i = 0; i < maxRetries && readContainerFile(containerId, "/omnicom/finished.txt").isEmpty(); i++) {
            try {
                Thread.sleep(sleepDelta);

                boolean isWaitingForInput = !readContainerFile(containerId, "/omnicom/input_needed").isEmpty();
                if (isWaitingForInput) {
                    response.setContainerId(containerId);
                    response.setWaitingForInput(true);
                    break;
                }
            } catch (InterruptedException e) {
                logger.log(Level.WARNING, e.getMessage());
            }
        }

        response.setOutput(readContainerFile(containerId, "/omnicom/output.txt"));
        response.setError(readContainerFile(containerId, "/omnicom/error.txt"));

        return response;
    }

    @Override
    public OutputResponse getOutput(byte[] input, String flags) {
        OutputResponse response = new OutputResponse();

        String containerPath = "/omnicom/docker/default_input.min";
        String filePath = "default_input.min";

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(input);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        Thread nonBlocking = new Thread(() -> {
            Bind bind = Bind.parse(new File(filePath).getAbsolutePath() + ":" + containerPath);

            CreateContainerResponse container = client.createContainerCmd("minimum:1.0.5")
                    .withAttachStderr(true)
                    .withAttachStdout(true)
                    .withStdinOpen(true)
                    .withTty(true)
                    .withHostConfig(new HostConfig().withBinds(bind))
                    .withEnv("FLAGS=" + flags)
                    .exec();

            client.startContainerCmd(container.getId()).exec();

            response.copy(readContainerOutput(container.getId()));

            if (!response.isWaitingForInput()) {
                client.removeContainerCmd(container.getId())
                        .withRemoveVolumes(true)
                        .withForce(true)
                        .exec();
            }
        });

        try {
            nonBlocking.start();
            nonBlocking.join(2000);
        }
        catch (InterruptedException e){
            response.setRetry(true);
            logger.log(Level.WARNING, "Thread got interrupted");
        }

        if (nonBlocking.isAlive()){
            response.setRetry(true);
            logger.log(Level.WARNING, "Request did not finished successfully");
            nonBlocking.interrupt();
        }

        return response;
    }

    @Override
    public OutputResponse provideInput(String containerId, String userInput) {
        AttachContainerResultCallback callback = new AttachContainerResultCallback();

        try (
                PipedOutputStream out = new PipedOutputStream();
                PipedInputStream in = new PipedInputStream(out)
        ) {
            client.attachContainerCmd(containerId)
                    .withStdErr(true)
                    .withStdOut(true)
                    .withFollowStream(true)
                    .withStdIn(in)
                    .exec(callback);

            out.write((userInput + "\n").getBytes());
            out.flush();

            callback.awaitCompletion(5, TimeUnit.SECONDS);
            callback.close();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return readContainerOutput(containerId);
    }

    @Override
    public OutputResponse interrupt(String containerId) {
        OutputResponse response = new OutputResponse();

        try {
            client.stopContainerCmd(containerId).exec();

            client.removeContainerCmd(containerId)
                    .withRemoveVolumes(true)
                    .withForce(true)
                    .exec();
        }
        catch (ConflictException e){
            logger.log(Level.WARNING, "container " + containerId.substring(0, 5) + "... already deleted");
        }

        return response;
    }

}
