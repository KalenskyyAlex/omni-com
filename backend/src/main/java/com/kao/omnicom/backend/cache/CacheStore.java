package com.kao.omnicom.backend.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import jakarta.validation.constraints.NotNull;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class CacheStore<Key, Value> {

    private final Logger logger = Logger.getLogger("CacheStore");

    private Cache<Key, Value> cache;

    public CacheStore(int expirationDuration, TimeUnit timeUnit) {
        cache = CacheBuilder.newBuilder().
                expireAfterWrite(expirationDuration, timeUnit)
                .concurrencyLevel(Runtime.getRuntime().availableProcessors())
                .build();
    }

    public Value get(@NotNull Key key) {
        logger.log(Level.INFO, "Retrieving from Cache with key: {0}", key);
        return cache.getIfPresent(key);
    }

    public void put(@NotNull Key key, Value value) {
        logger.log(Level.INFO, "Storing in Cache with key: {0}", key);
        cache.put(key, value);
    }

    public void remove(@NotNull Key key) {
        logger.log(Level.INFO, "Removing from Cache with key: {0}", key);
        cache.invalidate(key);
    }

}
