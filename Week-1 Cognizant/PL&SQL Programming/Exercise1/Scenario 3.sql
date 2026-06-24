DO $BODY$
DECLARE
    loan_rec RECORD;
BEGIN
    FOR loan_rec IN
        SELECT l.loanid,
               c.name,
               l.enddate
        FROM loans l
        JOIN customers c
        ON l.customerid = c.customerid
        WHERE l.enddate BETWEEN CURRENT_DATE
                            AND CURRENT_DATE + INTERVAL '30 days'
    LOOP
        RAISE NOTICE 'Reminder: Loan % for customer % is due on %',
                     loan_rec.loanid,
                     loan_rec.name,
                     loan_rec.enddate;
    END LOOP;
END;
$BODY$;
SELECT * FROM loans;