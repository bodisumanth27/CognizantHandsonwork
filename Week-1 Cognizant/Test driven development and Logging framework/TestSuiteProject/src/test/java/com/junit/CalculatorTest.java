package com.junit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CalculatorTest {

    @Test
    void testAdd() {
        Calculator c = new Calculator();
        assertEquals(10, c.add(5, 5));
    }

    @Test
    void testMultiply() {
        Calculator c = new Calculator();
        assertEquals(20, c.multiply(4, 5));
    }
}