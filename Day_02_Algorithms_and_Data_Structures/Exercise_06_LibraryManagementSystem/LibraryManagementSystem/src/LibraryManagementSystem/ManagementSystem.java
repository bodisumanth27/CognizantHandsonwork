package LibraryManagementSystem;
public class ManagementSystem {

    public static Book linearSearch(Book[] books, String title) {

        for (Book book : books) {

            if (book.title.equalsIgnoreCase(title)) {
                return book;
            }
        }

        return null;
    }

    public static Book binarySearch(Book[] books, String title) {

        int low = 0;
        int high = books.length - 1;

        while (low <= high) {

            int mid = (low + high) / 2;

            int result =
                    books[mid].title.compareToIgnoreCase(title);

            if (result == 0)
                return books[mid];

            if (result < 0)
                low = mid + 1;
            else
                high = mid - 1;
        }

        return null;
    }

    public static void main(String[] args) {

        Book[] books = {
                new Book(1, "C Programming", "Dennis Ritchie"),
                new Book(2, "Java", "James Gosling"),
                new Book(3, "Python", "Guido van Rossum")
        };

        Book found1 = linearSearch(books, "Java");

        if (found1 != null) {
            System.out.println("Linear Search Found:");
            System.out.println(found1.title + " - " + found1.author);
        }

        Book found2 = binarySearch(books, "Python");

        if (found2 != null) {
            System.out.println("\nBinary Search Found:");
            System.out.println(found2.title + " - " + found2.author);
        }
    }
}