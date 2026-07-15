package com.cognizant.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.ecommerce.entity.Customer;
import com.cognizant.ecommerce.service.CustomerService;
import com.cognizant.ecommerce.service.EmailService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/customers")
@Tag(name = "Customer Controller", description = "Customer Management APIs")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @Autowired
    private EmailService emailService;

    // ===================================
    // Get All Customers
    // ===================================

    @Operation(summary = "Get All Customers")
    @GetMapping
    public List<Customer> getAllCustomers() {

        return service.getAllCustomers();
    }

    // ===================================
    // Get Customer By Id
    // ===================================

    @Operation(summary = "Get Customer By Id")
    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Integer id) {

        return service.getCustomer(id);
    }

    // ===================================
    // Add Customer
    // ===================================

    @Operation(summary = "Add Customer")
    @PostMapping
    public Customer addCustomer(

            @Valid
            @RequestBody Customer customer) {

        return service.addCustomer(customer);
    }

    // ===================================
    // Update Customer
    // ===================================

    @Operation(summary = "Update Customer")
    @PutMapping("/{id}")
    public Customer updateCustomer(

            @PathVariable Integer id,

            @Valid
            @RequestBody Customer customer) {

        return service.updateCustomer(id, customer);
    }

    // ===================================
    // Delete Customer
    // ===================================

    @Operation(summary = "Delete Customer")
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Integer id) {

        service.deleteCustomer(id);

        return "Customer Deleted Successfully";
    }

    // ===================================
    // Search Customer By Email
    // ===================================

    @Operation(summary = "Search Customer By Email")
    @GetMapping("/email")
    public Customer getCustomerByEmail(

            @RequestParam String email) {

        return service.getCustomerByEmail(email);
    }

    // ===================================
    // Pagination
    // ===================================

    @Operation(summary = "Pagination")
    @GetMapping("/page")
    public Page<Customer> pageCustomers(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size) {

        return service.getCustomers(page, size);
    }

    // ===================================
    // Sorting ASC
    // ===================================

    @Operation(summary = "Sort Customers ASC")
    @GetMapping("/sort")
    public List<Customer> sortCustomers(

            @RequestParam String field) {

        return service.sortCustomers(field);
    }

    // ===================================
    // Sorting DESC
    // ===================================

    @Operation(summary = "Sort Customers DESC")
    @GetMapping("/sortdesc")
    public List<Customer> sortCustomersDesc(

            @RequestParam String field) {

        return service.sortCustomersDesc(field);
    }

    // ===================================
    // Pagination + Sorting
    // ===================================

    @Operation(summary = "Pagination + Sorting")
    @GetMapping("/pagesort")
    public Page<Customer> pageSortCustomers(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam String field) {

        return service.pageSortCustomers(page, size, field);
    }

    // ===================================
    // Send HTML Test Email
    // ===================================

    @Operation(summary = "Send HTML Test Email")
    @PostMapping("/send-test-email")
    public String sendTestEmail(@RequestParam String email) {

        try {

            emailService.sendHtmlEmail(

                    email,

                    "Varun");

            return "HTML Email Sent Successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return "Failed to Send Email : " + e.getMessage();

        }

    }

}