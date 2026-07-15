package com.cognizant.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.ecommerce.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findByCustomerId(Integer customerId);

}