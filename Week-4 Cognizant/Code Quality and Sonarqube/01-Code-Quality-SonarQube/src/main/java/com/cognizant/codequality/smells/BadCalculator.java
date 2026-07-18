package com.cognizant.codequality.smells;

import java.io.*;
import java.util.*;

/**
 * Code containing several code smells (commented code, magic numbers, 
 * unclosed resources, unused variables, raw lists, nested ifs).
 */
public class BadCalculator {
    public int x = 10; // Unused field or public variables violating encapsulation
    
    public double calculate(int a, int b, String op) {
        // Code Smell: Unused local variable
        int tempVal = 100;
        
        // Code Smell: Raw type list usage
        List myNumbers = new ArrayList();
        
        // Code Smell: Resource leak (FileInputStream is not closed)
        try {
            FileInputStream fis = new FileInputStream("nonexistent.txt");
            int content = fis.read();
        } catch (Exception e) {
            // Code Smell: Printing stacktrace directly
            e.printStackTrace();
        }
        
        // Code Smell: Magic string checks and deeply nested if-else statements
        if (op != null) {
            if (op.equals("ADD")) {
                // Code Smell: Magic number 0
                if (a == 0) {
                    return b;
                } else {
                    return a + b;
                }
            } else if (op.equals("SUB")) {
                return a - b;
            } else if (op.equals("MUL")) {
                // Code Smell: Magic number 1000 limit
                if (a > 1000) {
                    System.out.println("Too big!");
                }
                return a * b;
            } else {
                return 0.0;
            }
        }
        
        // Code Smell: Dead code
        // System.out.println("This is dead code!");
        
        return 0.0;
    }
}
