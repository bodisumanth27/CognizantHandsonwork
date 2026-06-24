package EcommercePlatformSearchFunction;

public class EcommerceSearch {

    public static Product linearSearch(Product[] products, String name) {

        for (Product p : products) {
            if (p.productName.equalsIgnoreCase(name)) {
                return p;
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] products, String name) {

        int low = 0;
        int high = products.length - 1;

        while (low <= high) {

            int mid = (low + high) / 2;

            int result = products[mid].productName.compareToIgnoreCase(name);

            if (result == 0)
                return products[mid];

            if (result < 0)
                low = mid + 1;
            else
                high = mid - 1;
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(1, "Laptop", "Electronics"),
                new Product(2, "Mobile", "Electronics"),
                new Product(3, "Tablet", "Electronics")
        };

        Product p1 = linearSearch(products, "Mobile");

        if (p1 != null)
            System.out.println("Linear Search Found: " + p1.productName);

        Product[] sortedProducts = {
                new Product(1, "Laptop", "Electronics"),
                new Product(2, "Mobile", "Electronics"),
                new Product(3, "Tablet", "Electronics")
        };

        Product p2 = binarySearch(sortedProducts, "Tablet");

        if (p2 != null)
            System.out.println("Binary Search Found: " + p2.productName);
    }
}