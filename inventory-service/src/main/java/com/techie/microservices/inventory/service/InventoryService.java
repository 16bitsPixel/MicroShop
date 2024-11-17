package com.techie.microservices.inventory.service;

import com.techie.microservices.inventory.dto.InventoryRequest;
import com.techie.microservices.inventory.model.Inventory;
import com.techie.microservices.inventory.repository.InventoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public boolean isInStock(String skuCode, Integer quantity) {
        // find an inventory for a given skuCode where quantity >= quantityInput
        return inventoryRepository.existsBySkuCodeAndQuantityIsGreaterThanEqual(skuCode, quantity);
    }

    public void updateStock(String skuCode, Integer quantity) {
        // find an inventory for a given skuCode and set to -= quantity
        inventoryRepository.updateProductQuantity(skuCode, quantity);
    }

    public Integer getQuantity(String skuCode) {
        return inventoryRepository.findQuantityBySkuCode(skuCode);
    }

    public void stockInventory(String skuCode, Integer quantity) {
            // map inventoryRequest to inventory object
            Inventory inventory = new Inventory();
            inventory.setSkuCode(skuCode);
            inventory.setQuantity(quantity);

            // save order to Inventory Repository
            inventoryRepository.save(inventory);
    }
}
