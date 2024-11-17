package com.techie.microservices.inventory.repository;

import com.techie.microservices.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    boolean existsBySkuCodeAndQuantityIsGreaterThanEqual(String skuCode, Integer quantity);

    @Query("SELECT i.quantity FROM Inventory i WHERE i.skuCode = :skuCode")
    Integer findQuantityBySkuCode(@Param("skuCode") String skuCode);

    @Transactional
    @Modifying
    @Query("UPDATE Inventory i SET i.quantity = i.quantity - :quantity WHERE i.skuCode = :skuCode AND i.quantity >= :quantity")
    Integer updateProductQuantity(@Param("skuCode") String skuCode, @Param("quantity") Integer quantity);
}
