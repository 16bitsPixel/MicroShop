package com.techie.microservices.order.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PutExchange;

public interface InventoryClient {

    Logger log = LoggerFactory.getLogger(InventoryClient.class);

    @GetExchange("/api/inventory")
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
    @Retry(name = "inventory")
    boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);

    @PutExchange("/api/inventory/{id}")
    @CircuitBreaker(name = "inventory", fallbackMethod = "updateFallbackMethod")
    @Retry(name = "inventory")
    void updateStock(@PathVariable String id, @RequestParam Integer quantity);

    default boolean fallbackMethod(String code, Integer quantity, Throwable throwable) {
        log.info("Cannot get inventory for skucode {}, failure reason: {}", code, throwable.getMessage());
        return false;
    }

    // Fallback for the updateStock method
    default void updateFallbackMethod(String skuCode, Integer quantity, Throwable throwable) {
        log.info("Failed to update stock for skuCode {}, quantity {}, failure reason: {}", skuCode, quantity, throwable.getMessage());
    }
}
