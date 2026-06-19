
public class RunnableSingleton {

    public static void main(String[] args) {
        Singleton a = Singleton.getInstance();
        Singleton b = Singleton.getInstance();
        System.out.println("Singleton A ID: " + a.getId());
        System.out.println("Singleton B ID: " + b.getId());
        System.out.println("Same instance: " + (a == b));
    }
}

class Singleton {

    private static volatile Singleton instance;
    private final String id;

    private Singleton() {
        this.id = "SINGLETON-" + System.identityHashCode(this);
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    public String getId() {
        return id;
    }
}
