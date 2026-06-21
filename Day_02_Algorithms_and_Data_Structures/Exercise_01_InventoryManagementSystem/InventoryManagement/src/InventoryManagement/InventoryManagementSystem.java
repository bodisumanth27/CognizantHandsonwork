package InventoryManagement;

import java.util.HashMap;

public class InventoryManagementSystem {

    public static void main(String[] args) {

        HashMap<Integer, Product> inventory = new HashMap<>();

        inventory.put(1, new Product(1, "Laptop", 10, 50000));
        inventory.put(2, new Product(2, "Mobile", 20, 25000));

        System.out.println("Products:");
        for (Product p : inventory.values()) {
            System.out.println(p);
        }

        inventory.remove(1);

        System.out.println("\nAfter Deletion:");
        for (Product p : inventory.values()) {
            System.out.println(p);
        }
    }
}