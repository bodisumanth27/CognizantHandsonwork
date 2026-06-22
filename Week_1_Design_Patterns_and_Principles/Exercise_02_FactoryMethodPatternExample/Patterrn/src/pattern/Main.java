package pattern;

public class Main {
    public static void main(String[] args) {
        Creator creator = new ConcreteCreator();

        Product product1 = creator.factoryMethod("A");
        product1.create();

        Product product2 = creator.factoryMethod("B");
        product2.create();
    }
}
