package com.cognizant.ecommerce.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.cognizant.ecommerce.entity.Customer;
import com.cognizant.ecommerce.exception.ResourceNotFoundException;
import com.cognizant.ecommerce.repository.CustomerRepository;

@Service
public class CustomerService {

    private static final Logger logger =
            LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private EmailService emailService;

    // ==========================================
    // Get All Customers
    // ==========================================

    public List<Customer> getAllCustomers() {

        logger.info("Fetching all customers");

        return repository.findAll();
    }

    // ==========================================
    // Get Customer By Id
    // ==========================================

    public Customer getCustomer(Integer id) {

        logger.info("Searching customer with id {}", id);

        return repository.findById(id)
                .orElseThrow(() -> {

                    logger.error("Customer not found with id {}", id);

                    return new ResourceNotFoundException("Customer Not Found");
                });
    }

    // ==========================================
    // Add Customer
    // ==========================================

    public Customer addCustomer(Customer customer) {

        logger.info("Adding new customer");

        Customer savedCustomer = repository.save(customer);

        // Send HTML Welcome Email
        try {

            emailService.sendHtmlEmail(

                    savedCustomer.getEmail(),

                    savedCustomer.getName());

            logger.info("Welcome Email Sent Successfully");

        } catch (Exception e) {

            logger.error("Failed to send welcome email");

            logger.error(e.getMessage());

        }

        return savedCustomer;
    }

    // ==========================================
    // Update Customer
    // ==========================================

    public Customer updateCustomer(Integer id,
                                   Customer customer) {

        logger.info("Updating customer {}", id);

        Customer old = getCustomer(id);

        old.setName(customer.getName());
        old.setEmail(customer.getEmail());
        old.setMobile(customer.getMobile());
        old.setAddress(customer.getAddress());

        Customer updated = repository.save(old);

        logger.info("Customer updated successfully");

        return updated;
    }

    // ==========================================
    // Delete Customer
    // ==========================================

    public void deleteCustomer(Integer id) {

        logger.info("Deleting customer {}", id);

        Customer customer = getCustomer(id);

        repository.delete(customer);

        logger.info("Customer deleted successfully");
    }

    // ==========================================
    // Search Customer By Email
    // ==========================================

    public Customer getCustomerByEmail(String email) {

        logger.info("Searching customer by email {}", email);

        return repository.findByEmail(email)
                .orElseThrow(() -> {

                    logger.error("Customer not found");

                    return new ResourceNotFoundException("Customer Not Found");
                });
    }

    // ==========================================
    // Pagination
    // ==========================================

    public Page<Customer> getCustomers(int page,
                                       int size) {

        logger.info("Fetching customer page {}", page);

        Pageable pageable = PageRequest.of(page, size);

        return repository.findAll(pageable);
    }

    // ==========================================
    // Sorting ASC
    // ==========================================

    public List<Customer> sortCustomers(String field) {

        logger.info("Sorting customers by {}", field);

        return repository.findAll(Sort.by(field));
    }

    // ==========================================
    // Sorting DESC
    // ==========================================

    public List<Customer> sortCustomersDesc(String field) {

        logger.info("Sorting customers descending by {}", field);

        return repository.findAll(
                Sort.by(field).descending());
    }

    // ==========================================
    // Pagination + Sorting
    // ==========================================

    public Page<Customer> pageSortCustomers(int page,
                                            int size,
                                            String field) {

        logger.info("Pagination + Sorting Customers");

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(field));

        return repository.findAll(pageable);
    }

}