DO $$
DECLARE
    rec RECORD;

    trans_cursor CURSOR FOR
    SELECT t.transactionid,
           c.name,
           t.amount,
           t.transactiontype
    FROM transactions t
    JOIN accounts a
        ON t.accountid = a.accountid
    JOIN customers c
        ON a.customerid = c.customerid;

BEGIN
    OPEN trans_cursor;

    LOOP
        FETCH trans_cursor INTO rec;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE
        'Customer: %, Transaction ID: %, Amount: %, Type: %',
        rec.name,
        rec.transactionid,
        rec.amount,
        rec.transactiontype;

    END LOOP;

    CLOSE trans_cursor;
END $$;
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public';
SELECT * FROM customers;
SELECT * FROM accounts;
SELECT * FROM transactions;