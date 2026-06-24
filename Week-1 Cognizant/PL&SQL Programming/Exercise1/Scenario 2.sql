ALTER TABLE customers
ADD COLUMN isvip BOOLEAN;
DO $BODY$
DECLARE
    cust RECORD;
BEGIN
    FOR cust IN
        SELECT customerid, balance
        FROM customers
    LOOP
        IF cust.balance > 10000 THEN
            UPDATE customers
            SET isvip = TRUE
            WHERE customerid = cust.customerid;
        ELSE
            UPDATE customers
            SET isvip = FALSE
            WHERE customerid = cust.customerid;
        END IF;
    END LOOP;
END;
$BODY$;
SELECT customerid, name, balance, isvip
FROM customers;