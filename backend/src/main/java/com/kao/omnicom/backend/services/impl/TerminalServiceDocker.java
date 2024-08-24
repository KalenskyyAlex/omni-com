package com.kao.omnicom.backend.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.Bind;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;

import com.kao.omnicom.backend.entity.OutputResponse;
import com.kao.omnicom.backend.services.TerminalService;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;

import java.io.*;

public class TerminalServiceDocker implements TerminalService {
    private final DockerClientConfig defaultConfig = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
    private final DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
            .dockerHost(defaultConfig.getDockerHost())
            .sslConfig(defaultConfig.getSSLConfig())
            .maxConnections(100)
            .build();

    @Override
    public OutputResponse getOutput(byte[] input, String flags) {
        OutputResponse response = new OutputResponse();

        DockerClient client = DockerClientImpl.getInstance(defaultConfig, httpClient);

        String containerPath = "/omnicom/docker/default_input.min";
        String filePath = "default_input.min";

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(input);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        Bind bind = Bind.parse(new File(filePath).getAbsolutePath() + ":" + containerPath);

        CreateContainerResponse container = client.createContainerCmd("minimum:1.0.3")
                .withAttachStderr(true)
                .withAttachStdout(true)
                .withTty(true)
                .withHostConfig(new HostConfig().withBinds(bind))
                .withEnv("FLAGS=" + flags)
                .exec();

        client.startContainerCmd(container.getId()).exec();

        Thread t = new Thread(() -> {
            while (client.inspectContainerCmd(container.getId()).exec().getState().getRunning()) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    System.out.println(e.getMessage());
                }
            }

            try {
                InputStream archive = client.copyArchiveFromContainerCmd(container.getId(), "/omnicom/output.txt").exec();

                TarArchiveInputStream tar = new TarArchiveInputStream(archive);
                TarArchiveEntry currentEntry = tar.getNextTarEntry();
                BufferedReader br;
                StringBuilder sb = new StringBuilder();
                while (currentEntry != null) {
                    br = new BufferedReader(new InputStreamReader(tar));
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                    currentEntry = tar.getNextTarEntry();
                }

                response.setOutput(sb.toString());
            } catch (IOException e) {
                System.out.println(e.getMessage());
                throw new RuntimeException(e);
            }
        });

        t.start();

        try {
            t.join();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return response;
    }
}
