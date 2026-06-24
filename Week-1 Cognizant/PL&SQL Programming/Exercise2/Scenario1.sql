CREATE TABLE customers (
    customerid INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    balance NUMERIC,
    lastmodified DATE
);

CREATE TABLE accounts (
    accountid INT PRIMARY KEY,
    customerid INT,
    accounttype VARCHAR(20),
    balance NUMERIC,
    lastmodified DATE
);

CREATE TABLE transactions (
    transactionid INT PRIMARY KEY,
    accountid INT,
    transactiondate DATE,
    amount NUMERIC,
    transactiontype VARCHAR(20)
);

CREATE TABLE loans (
    loanid INT PRIMARY KEY,
    customerid INT,
    loanamount NUMERIC,
    interestrate NUMERIC,
    startdate DATE,
    enddate DATE
);

CREATE TABLE employees (
    employeeid INT PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(50),
    salary NUMERIC,
    department VARCHAR(50),
    hiredate DATE
);
INSERT INTO customers VALUES
(1,'John Doe','1950-05-15',12000,CURRENT_DATE),
(2,'Jane Smith','1995-07-20',5000,CURRENT_DATE);

INSERT INTO accounts VALUES
(1,1,'Savings',10000,CURRENT_DATE),
(2,2,'Checking',5000,CURRENT_DATE);

INSERT INTO loans VALUES
(1,1,5000,5,CURRENT_DATE,CURRENT_DATE+20),
(2,2,8000,6,CURRENT_DATE,CURRENT_DATE+40);

INSERT INTO employees VALUES
(1,'Alice','Manager',70000,'HR','2015-06-15'),
(2,'Bob','Developer',60000,'IT','2017-03-20');
CALL SafeTransferFunds(1,2,500);