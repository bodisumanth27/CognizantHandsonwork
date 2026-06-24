CREATE TABLE IF NOT EXISTS accounts (
    accountid INT PRIMARY KEY,
    customerid INT,
    accounttype VARCHAR(20),
    balance NUMERIC,
    lastmodified DATE
);
CREATE TABLE IF NOT EXISTS transactions (
    transactionid INT PRIMARY KEY,
    accountid INT,
    transactiondate DATE,
    amount NUMERIC,
    transactiontype VARCHAR(20)
);
INSERT INTO accounts
VALUES
(1,1,'Savings',10000,CURRENT_DATE),
(2,2,'Checking',5000,CURRENT_DATE);
CREATE TRIGGER CheckTransactionRules
BEFORE INSERT
ON transactions
FOR EACH ROW
EXECUTE FUNCTION check_transaction_rules();
INSERT INTO transactions
VALUES (
    1,
    1,
    CURRENT_DATE,
    500,
    'Deposit'
);