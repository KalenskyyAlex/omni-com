package com.kao.omnicom.backend.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;

import com.kao.omnicom.backend.services.TerminalService;
import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.aspectj.util.FileUtil;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class TerminalServiceDocker implements TerminalService {
    private final DockerClientConfig defaultConfig = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
    private final DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
            .dockerHost(defaultConfig.getDockerHost())
            .sslConfig(defaultConfig.getSSLConfig())
            .maxConnections(100)
            .build();

    @Override
    public void getOutput(File input) {
        DockerClient client = DockerClientImpl.getInstance(defaultConfig, httpClient);

        CreateContainerResponse container = client.createContainerCmd("minimum:1.0.3")
                .withAttachStderr(true)
                .withAttachStdout(true)
                .withTty(true)
//                .withEnv("FLAGS=-c -l -p")
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
                BufferedReader br = null;
                StringBuilder sb = new StringBuilder();
                while (currentEntry != null) {
                    br = new BufferedReader(new InputStreamReader(tar)); // Read directly from tarInput
                    String line;
                    while ((line = br.readLine()) != null) {
                        System.out.println(line);
                    }
                    currentEntry = tar.getNextTarEntry(); // You forgot to iterate to the next file
                }
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
    }
}
