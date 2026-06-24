package SortingCustomerOrders;

public class Order {

    int orderId;
    String customerName;
    double totalPrice;

    public Order(int orderId, String customerName, double totalPrice) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.totalPrice = totalPrice;
    }

    public void display() {
        System.out.println(orderId + " " + customerName + " " + totalPrice);
    }
}