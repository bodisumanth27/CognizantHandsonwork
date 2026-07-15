package com.cognizant.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.cognizant.ecommerce.dto.OrderRequest;
import com.cognizant.ecommerce.entity.Orders;
import com.cognizant.ecommerce.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public Orders placeOrder(@RequestBody OrderRequest request) {
        return service.placeOrder(request);
    }

    @GetMapping
    public List<Orders> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Orders getOrder(@PathVariable Integer id) {
        return service.getOrder(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<Orders> getCustomerOrders(@PathVariable Integer customerId) {
        return service.getCustomerOrders(customerId);
    }
}