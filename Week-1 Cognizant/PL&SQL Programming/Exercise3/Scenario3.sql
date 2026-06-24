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
CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account INT,
    p_to_account INT,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_balance NUMERIC;
BEGIN
    SELECT balance
    INTO v_balance
    FROM accounts
    WHERE accountid = p_from_account;

    IF v_balance >= p_amount THEN

        UPDATE accounts
        SET balance = balance - p_amount
        WHERE accountid = p_from_account;

        UPDATE accounts
        SET balance = balance + p_amount
        WHERE accountid = p_to_account;

        RAISE NOTICE 'Transfer Successful';

    ELSE
        RAISE NOTICE 'Insufficient Balance';
    END IF;
END;
$$;
CALL TransferFunds(1,2,500);
SELECT * FROM accounts;