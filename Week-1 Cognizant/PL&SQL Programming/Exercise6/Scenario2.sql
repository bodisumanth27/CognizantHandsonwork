DO $$
DECLARE
    rec RECORD;

    acc_cursor CURSOR FOR
    SELECT accountid
    FROM accounts;

BEGIN

    OPEN acc_cursor;

    LOOP
        FETCH acc_cursor INTO rec;

        EXIT WHEN NOT FOUND;

        UPDATE accounts
        SET balance = balance - 100
        WHERE accountid = rec.accountid;

    END LOOP;

    CLOSE acc_cursor;

    RAISE NOTICE 'Annual Fee Applied';

END $$;
SELECT * FROM accounts;