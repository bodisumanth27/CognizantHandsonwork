package TaskManagementSystem;

public class TaskManagementSystem {

    public static void main(String[] args) {

        TaskLinkedList tasks = new TaskLinkedList();

        tasks.addTask(1, "Design Module", "Pending");
        tasks.addTask(2, "Write Code", "In Progress");
        tasks.addTask(3, "Testing", "Pending");

        System.out.println("All Tasks:");
        tasks.traverseTasks();

        System.out.println("\nSearch Task:");
        tasks.searchTask(2);

        System.out.println("\nDelete Task:");
        tasks.deleteTask(2);

        System.out.println("\nTasks After Deletion:");
        tasks.traverseTasks();
    }
}