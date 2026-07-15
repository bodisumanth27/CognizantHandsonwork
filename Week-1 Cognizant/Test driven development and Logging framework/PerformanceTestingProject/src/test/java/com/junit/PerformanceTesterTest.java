package com.junit;

import static org.junit.jupiter.api.Assertions.assertTimeout;

import java.time.Duration;

import org.junit.jupiter.api.Test;

public class PerformanceTesterTest {

    @Test
    void testPerformance() {

        PerformanceTester tester = new PerformanceTester();

        assertTimeout(Duration.ofSeconds(3), () -> {

            tester.performTask();

        });

    }

}