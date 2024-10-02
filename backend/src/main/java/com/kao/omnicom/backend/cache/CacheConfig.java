package com.kao.omnicom.backend.cache;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    @Bean(name = {"userLoginCache"})
    public CacheStore<String, Integer> cacheStore(){
        int TIMEOUT_MINUTES = 15;
        return new CacheStore<>(TIMEOUT_MINUTES, TimeUnit.MINUTES);
    }

}
