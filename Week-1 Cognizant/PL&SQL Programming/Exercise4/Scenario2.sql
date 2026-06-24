 CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(
    p_loanamount NUMERIC,
    p_interestrate NUMERIC,
    p_years INT
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    emi NUMERIC;
BEGIN
    emi :=
    (p_loanamount +
    (p_loanamount * p_interestrate * p_years / 100))
    / (p_years * 12);

    RETURN ROUND(emi,2);
END;
$$;
SELECT CalculateMonthlyInstallment(
500000,
8,
5
);