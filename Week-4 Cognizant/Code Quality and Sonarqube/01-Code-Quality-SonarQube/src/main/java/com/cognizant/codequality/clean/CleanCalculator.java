package com.cognizant.codequality.clean;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Refactored clean code: proper try-with-resources, constants, 
 * type-safe generics, minimal nesting, proper logging.
 */
public class CleanCalculator {
    private static final Logger LOGGER = Logger.getLogger(CleanCalculator.class.getName());
    
    private static final String OPERATION_ADD = "ADD";
    private static final String OPERATION_SUB = "SUB";
    private static final String OPERATION_MUL = "MUL";
    private static final int MAX_MUL_LIMIT = 1000;

    private int configValue = 10;

    public int getConfigValue() {
        return configValue;
    }

    public void setConfigValue(int configValue) {
        this.configValue = configValue;
    }

    public double calculate(int a, int b, String op) {
        readConfigSafe();
        
        List<Integer> myNumbers = new ArrayList<>();
        myNumbers.add(a);
        myNumbers.add(b);

        if (op == null) {
            return 0.0;
        }

        return switch (op) {
            case OPERATION_ADD -> a + b;
            case OPERATION_SUB -> a - b;
            case OPERATION_MUL -> {
                if (a > MAX_MUL_LIMIT) {
                    LOGGER.info("Multiplier input exceeds threshold limit");
                }
                yield (double) a * b;
            }
            default -> 0.0;
        };
    }

    private void readConfigSafe() {
        // Clean: Try-with-resources blocks ensure automatic resource closure
        try (FileInputStream fis = new FileInputStream("config.txt")) {
            int content = fis.read();
            LOGGER.log(Level.INFO, "Config content length read: {0}", content);
        } catch (IOException e) {
            LOGGER.log(Level.WARNING, "Failed to read configuration: {0}", e.getMessage());
        }
    }
}
