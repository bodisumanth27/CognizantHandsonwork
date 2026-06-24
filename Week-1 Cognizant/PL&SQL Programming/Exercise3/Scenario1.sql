CREATE TABLE accounts (
    accountid INT PRIMARY KEY,
    customerid INT,
    accounttype VARCHAR(20),
    balance NUMERIC,
    lastmodified DATE
);
INSERT INTO accounts
VALUES
(1,1,'Savings',10000,CURRENT_DATE),
(2,2,'Checking',5000,CURRENT_DATE);
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE accounts
    SET balance = balance + (balance * 0.01)
    WHERE accounttype = 'Savings';

    RAISE NOTICE 'Monthly Interest Applied';
END;
$$;
CALL ProcessMonthlyInterest();
SELECT * FROM accounts;