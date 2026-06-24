CREATE SCHEMA IF NOT EXISTS CustomerManagement;
CREATE OR REPLACE PROCEDURE CustomerManagement.AddCustomer(
    p_customerid INT,
    p_name VARCHAR,
    p_dob DATE,
    p_balance NUMERIC
)
LANGUAGE plpgsql
AS $$ 
BEGIN
    INSERT INTO customers(
        customerid,
        name,
        dob,
        balance,
        lastmodified
    )
    VALUES(
        p_customerid,
        p_name,
        p_dob,
        p_balance,
        CURRENT_DATE
    );

    RAISE NOTICE 'Customer Added Successfully';
END;
$$;
CREATE OR REPLACE PROCEDURE CustomerManagement.UpdateCustomer(
    p_customerid INT,
    p_balance NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE customers
    SET balance = p_balance
    WHERE customerid = p_customerid;

    RAISE NOTICE 'Customer Updated Successfully';
END;
$$;
CREATE OR REPLACE FUNCTION CustomerManagement.GetCustomerBalance(
    p_customerid INT
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    v_balance NUMERIC;
BEGIN
    SELECT balance
    INTO v_balance
    FROM customers
    WHERE customerid = p_customerid;

    RETURN v_balance;
END;
$$;
CALL CustomerManagement.AddCustomer(
    3,
    'Rahul',
    '1998-05-10',
    15000
);
CALL CustomerManagement.UpdateCustomer(
    3,
    20000
);
SELECT CustomerManagement.GetCustomerBalance(3);