CREATE OR REPLACE FUNCTION HasSufficientBalance(
    p_accountid INT,
    p_amount NUMERIC
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_balance NUMERIC;
BEGIN
    SELECT balance
    INTO v_balance
    FROM accounts
    WHERE accountid = p_accountid;

    RETURN v_balance >= p_amount;
END;
$$;
SELECT HasSufficientBalance(1,500);