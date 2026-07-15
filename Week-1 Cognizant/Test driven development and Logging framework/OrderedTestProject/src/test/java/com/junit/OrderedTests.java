package com.junit;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderedTests {

    @Test
    @Order(1)
    void testRegister() {

        System.out.println("1. Register User");

    }

    @Test
    @Order(2)
    void testLogin() {

        System.out.println("2. Login User");

    }

    @Test
    @Order(3)
    void testAddBook() {

        System.out.println("3. Add Book");

    }

    @Test
    @Order(4)
    void testDeleteBook() {

        System.out.println("4. Delete Book");

    }

}