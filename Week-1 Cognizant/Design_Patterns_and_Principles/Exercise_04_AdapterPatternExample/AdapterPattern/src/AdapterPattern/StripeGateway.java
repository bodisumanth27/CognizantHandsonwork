package AdapterPattern;
public class StripeGateway {
    public void makePayment(double amount) {
        System.out.println("Payment of Rs." + amount + " processed through Stripe.");
    }
}