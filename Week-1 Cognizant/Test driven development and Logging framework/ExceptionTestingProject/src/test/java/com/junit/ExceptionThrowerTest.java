package com.junit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

public class ExceptionThrowerTest {

    @Test
    void testDivide() {

        ExceptionThrower obj = new ExceptionThrower();

        assertEquals(5, obj.divide(10, 2));

    }

    @Test
    void testDivideByZero() {

        ExceptionThrower obj = new ExceptionThrower();

        assertThrows(ArithmeticException.class, () -> {

            obj.divide(10, 0);

        });

    }

}