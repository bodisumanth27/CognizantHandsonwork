package AdapterPattern;

public class PatternExample {

    public static void main(String[] args) {

        PaymentProcessor payPal =
                new PayPalAdapter(new PayPalGateway());

        PaymentProcessor stripe =
                new StripeAdapter(new StripeGateway());

        payPal.processPayment(1000);
        stripe.processPayment(2000);
    }
}