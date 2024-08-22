package com.kao.omnicom.backend.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.WaitContainerResultCallback;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;

import com.kao.omnicom.backend.services.TerminalService;

import java.io.*;

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

        CreateContainerResponse container = client.createContainerCmd("minimum:1.0.2")
                .withAttachStderr(true)
                .withAttachStdout(true)
                .withTty(true)
                .withEnv("FLAGS=-c -l -p")
                .exec();


        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        client.startContainerCmd(container.getId()).exec();

        WaitContainerResultCallback resultCallback = new WaitContainerResultCallback();
        client.waitContainerCmd(container.getId()).exec(resultCallback);
        try {
            resultCallback.awaitCompletion();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }


//        try {
//            Thread.sleep(1000);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//
//        LogContainerCmd logContainerCmd = client.logContainerCmd(container.getId());
//        logContainerCmd.withStdOut(true).withStdErr(true);
//
//        logContainerCmd.withTimestamps(true);
//
//        try {
//            logContainerCmd.exec(new LogContainerResultCallback() {
//                @Override
//                public void onNext(Frame item) {
//                    System.out.println(item);
//                }
//            }).awaitCompletion();
//        } catch (InterruptedException e) {
//            System.out.println(":(");
//        }

//        try {
//            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//
//            client.execStartCmd(container.getId())
//                    .exec(new ExecStartResultCallback(outputStream, outputStream))
//                    .awaitCompletion();
//
//            System.out.println(outputStream.toString());
//
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
    }
}
