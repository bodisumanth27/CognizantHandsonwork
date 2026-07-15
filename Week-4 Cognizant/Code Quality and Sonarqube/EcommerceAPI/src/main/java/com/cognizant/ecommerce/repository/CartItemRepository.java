package com.cognizant.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.ecommerce.entity.CartItem;

public interface CartItemRepository
        extends JpaRepository<CartItem, Integer> {

}