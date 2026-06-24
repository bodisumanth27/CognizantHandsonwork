DO $$
DECLARE
    rec RECORD;

    loan_cursor CURSOR FOR
    SELECT loanid
    FROM loans;

BEGIN

    OPEN loan_cursor;

    LOOP
        FETCH loan_cursor INTO rec;

        EXIT WHEN NOT FOUND;

        UPDATE loans
        SET interestrate = interestrate + 0.5
        WHERE loanid = rec.loanid;

    END LOOP;

    CLOSE loan_cursor;

    RAISE NOTICE 'Interest Rates Updated';

END $$;
SELECT * FROM loans;