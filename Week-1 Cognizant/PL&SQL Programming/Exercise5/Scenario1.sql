CREATE TABLE customers (
    customerid INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    balance NUMERIC,
    lastmodified DATE
);
INSERT INTO customers
VALUES
(1,'John Doe','1950-05-15',12000,CURRENT_DATE),
(2,'Jane Smith','1995-07-20',5000,CURRENT_DATE);
SELECT * FROM customers;