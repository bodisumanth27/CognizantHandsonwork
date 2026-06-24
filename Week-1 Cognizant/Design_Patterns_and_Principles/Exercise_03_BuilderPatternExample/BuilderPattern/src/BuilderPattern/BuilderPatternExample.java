package BuilderPattern;

public class BuilderPatternExample {

    public static void main(String[] args) {

        Computer gamingPC = new Computer.Builder()
                .setCPU("Intel i9")
                .setRAM(32)
                .setStorage(1000)
                .build();

        Computer officePC = new Computer.Builder()
                .setCPU("Intel i5")
                .setRAM(16)
                .setStorage(512)
                .build();

        System.out.println("Gaming PC Configuration:");
        gamingPC.showConfiguration();

        System.out.println();

        System.out.println("Office PC Configuration:");
        officePC.showConfiguration();
    }
}