CREATE SCHEMA IF NOT EXISTS accountoperations;
CREATE TABLE IF NOT EXISTS accounts (
    accountid INT PRIMARY KEY,
    customerid INT,
    accounttype VARCHAR(20),
    balance NUMERIC,
    lastmodified DATE
);
CREATE OR REPLACE PROCEDURE accountoperations.openaccount(
    p_accountid INT,
    p_customerid INT,
    p_balance NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO accounts(
        accountid,
        customerid,
        accounttype,
        balance,
        lastmodified
    )
    VALUES(
        p_accountid,
        p_customerid,
        'Savings',
        p_balance,
        CURRENT_DATE
    );

    RAISE NOTICE 'Account Opened Successfully';
END;
$$;
CREATE OR REPLACE PROCEDURE accountoperations.closeaccount(
    p_accountid INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM accounts
    WHERE accountid = p_accountid;

    RAISE NOTICE 'Account Closed Successfully';
END;
$$;
CREATE OR REPLACE FUNCTION accountoperations.gettotalbalance(
    p_customerid INT
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    v_total NUMERIC;
BEGIN
    SELECT COALESCE(SUM(balance),0)
    INTO v_total
    FROM accounts
    WHERE customerid = p_customerid;

    RETURN v_total;
END;
$$;
INSERT INTO accounts
VALUES
(1,1,'Savings',10000,CURRENT_DATE),
(2,2,'Checking',5000,CURRENT_DATE);
CALL accountoperations.openaccount(
    10,
    1,
    5000
);
SELECT * FROM accounts;
SELECT accountoperations.gettotalbalance(1);
CALL accountoperations.closeaccount(10);
SELECT * FROM accounts;