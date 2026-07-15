package com.cognizant.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.ecommerce.dto.OrderItemRequest;
import com.cognizant.ecommerce.dto.OrderRequest;
import com.cognizant.ecommerce.entity.Customer;
import com.cognizant.ecommerce.entity.OrderItem;
import com.cognizant.ecommerce.entity.OrderStatus;
import com.cognizant.ecommerce.entity.Orders;
import com.cognizant.ecommerce.entity.Product;
import com.cognizant.ecommerce.exception.BadRequestException;
import com.cognizant.ecommerce.exception.ResourceNotFoundException;
import com.cognizant.ecommerce.repository.CustomerRepository;
import com.cognizant.ecommerce.repository.OrderRepository;
import com.cognizant.ecommerce.repository.ProductRepository;

@Service
public class OrderService {

    private static final Logger logger =
            LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private InvoiceService invoiceService;

    // ==========================================
    // Place Order
    // ==========================================

    @Transactional
    public Orders placeOrder(OrderRequest request) {

        logger.info("Order Started");

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer Not Found"));

        Orders order = new Orders();

        order.setCustomer(customer);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        double total = 0;

        for (OrderItemRequest item : request.getItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Product Not Found"));

            if (product.getStock() < item.getQuantity()) {

                logger.warn("Insufficient stock for {}", product.getName());

                throw new BadRequestException("Insufficient Stock");
            }

            // Reduce Stock
            product.setStock(product.getStock() - item.getQuantity());

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());

            order.getOrderItems().add(orderItem);

            total += product.getPrice() * item.getQuantity();

            logger.info("Added Product {}", product.getName());
        }

        order.setTotalAmount(total);

        logger.info("Total Amount = {}", total);

        // Save Order
        Orders savedOrder = orderRepository.save(order);

        logger.info("Order Saved Successfully");

        // ==========================================
        // Generate Invoice
        // ==========================================

        String invoicePath = "";

        try {

            invoicePath = invoiceService.generateInvoice(savedOrder);

            logger.info("Invoice Generated Successfully");

        } catch (Exception e) {

            logger.error("Failed to Generate Invoice", e);
        }

        // ==========================================
        // Send Email with Attachment
        // ==========================================

        try {

            if (!invoicePath.isEmpty()) {

                emailService.sendEmailWithAttachment(

                        customer.getEmail(),

                        "Order Confirmation",

                        """
                        Dear %s,

                        Thank you for shopping with ECommerce.

                        Your order has been placed successfully.

                        Please find your invoice attached.

                        Regards,
                        ECommerce Team
                        """.formatted(customer.getName()),

                        invoicePath);

                logger.info("Order Confirmation Email Sent Successfully");

            }

        } catch (Exception e) {

            logger.error("Failed to send order confirmation email", e);
        }

        return savedOrder;
    }

    // ==========================================
    // Get All Orders
    // ==========================================

    public List<Orders> getAllOrders() {

        logger.info("Fetching All Orders");

        return orderRepository.findAll();
    }

    // ==========================================
    // Get Order By Id
    // ==========================================

    public Orders getOrder(Integer id) {

        logger.info("Searching Order {}", id);

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order Not Found"));
    }

    // ==========================================
    // Get Orders By Customer
    // ==========================================

    public List<Orders> getCustomerOrders(Integer customerId) {

        logger.info("Fetching Orders Of Customer {}", customerId);

        return orderRepository.findByCustomerId(customerId);
    }
}