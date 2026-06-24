CREATE OR REPLACE PROCEDURE AddNewCustomer(
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

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Customer ID already exists';
END;
$$;
CALL AddNewCustomer(
    3,
    'Rahul',
    '1998-05-10',
    15000
);
CALL AddNewCustomer(
    3,
    'Rahul',
    '1998-05-10',
    15000
);