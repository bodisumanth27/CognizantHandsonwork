package MVCPattern;

public class MVCPatternExample {

    public static void main(String[] args) {

        Student model = new Student(
                "Sumanth",
                "2300040004",
                "A"
        );

        StudentView view = new StudentView();

        StudentController controller =
                new StudentController(model, view);

        controller.updateView();

        System.out.println();

        controller.setStudentName("Rahul");
        controller.setStudentGrade("A+");

        controller.updateView();
    }
}