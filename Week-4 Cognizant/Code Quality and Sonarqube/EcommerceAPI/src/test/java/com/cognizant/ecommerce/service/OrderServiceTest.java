package com.cognizant.ecommerce.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cognizant.ecommerce.repository.CustomerRepository;
import com.cognizant.ecommerce.repository.OrderRepository;
import com.cognizant.ecommerce.repository.ProductRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @InjectMocks
    OrderService orderService;

    @Mock
    OrderRepository orderRepository;

    @Mock
    CustomerRepository customerRepository;

    @Mock
    ProductRepository productRepository;

    @Mock
    EmailService emailService;

    @Test
    void contextLoads() {

    }

}