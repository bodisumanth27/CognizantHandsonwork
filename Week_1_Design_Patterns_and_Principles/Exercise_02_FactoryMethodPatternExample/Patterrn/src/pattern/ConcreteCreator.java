package pattern;

public class ConcreteCreator extends Creator {
    @Override
    public Product factoryMethod(String type) {
        if ("A".equalsIgnoreCase(type)) {
            return new ConcreteProductA();
        }
        return new ConcreteProductB();
    }
}
