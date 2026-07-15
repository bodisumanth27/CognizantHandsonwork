package com.junit;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class EvenCheckerTest {

    @Test
    void testEven() {

        EvenChecker checker = new EvenChecker();

        assertTrue(checker.isEven(8));

    }
}