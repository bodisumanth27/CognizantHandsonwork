CREATE TABLE customers (
    customerid INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    balance NUMERIC,
    lastmodified DATE
);

CREATE TABLE loans (
    loanid INT PRIMARY KEY,
    customerid INT,
    loanamount NUMERIC,
    interestrate NUMERIC,
    startdate DATE,
    enddate DATE
);
INSERT INTO customers
VALUES
(1,'John Doe','1950-05-15',12000,CURRENT_DATE),
(2,'Jane Smith','1995-07-20',5000,CURRENT_DATE);

INSERT INTO loans
VALUES
(1,1,5000,5,CURRENT_DATE,CURRENT_DATE + INTERVAL '20 days'),
(2,2,8000,6,CURRENT_DATE,CURRENT_DATE + INTERVAL '40 days');
DO $$
DECLARE
    cust RECORD;
BEGIN
    FOR cust IN
        SELECT customerid,
               EXTRACT(YEAR FROM AGE(dob)) AS age
        FROM customers
    LOOP
        IF cust.age > 60 THEN
            UPDATE loans
            SET interestrate = interestrate - 1
            WHERE customerid = cust.customerid;
        END IF;
    END LOOP;
END $$;
SELECT * FROM loans;