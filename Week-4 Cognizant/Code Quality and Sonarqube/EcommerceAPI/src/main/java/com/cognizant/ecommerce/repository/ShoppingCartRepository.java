package com.cognizant.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.ecommerce.entity.ShoppingCart;

public interface ShoppingCartRepository
        extends JpaRepository<ShoppingCart, Integer> {

    Optional<ShoppingCart> findByCustomerId(Integer customerId);

}