package com.cognizant.ecommerce.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import com.cognizant.ecommerce.entity.Customer;
import com.cognizant.ecommerce.repository.CustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @InjectMocks
    CustomerService service;

    @Mock
    CustomerRepository repository;

    @Mock
    EmailService emailService;

    Customer customer;

    @BeforeEach
    void setup() {

        customer = new Customer();

        customer.setId(1);

        customer.setName("Varun");

        customer.setEmail("varun@gmail.com");

    }

    @Test
    void testGetCustomer() {

        when(repository.findById(1))
                .thenReturn(Optional.of(customer));

        Customer c = service.getCustomer(1);

        assertEquals("Varun", c.getName());

    }

    @Test
    void testAddCustomer() {

        when(repository.save(customer))
                .thenReturn(customer);

        Customer saved =
                service.addCustomer(customer);

        assertEquals("varun@gmail.com",
                saved.getEmail());

    }

}