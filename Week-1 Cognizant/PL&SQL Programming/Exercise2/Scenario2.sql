CREATE TABLE employees(
    employeeid INT PRIMARY KEY,
    name VARCHAR(100),
    salary NUMERIC
);
INSERT INTO employees
VALUES
(1,'Alice',50000),
(2,'Bob',60000);
CREATE OR REPLACE PROCEDURE UpdateSalary(
    p_empid INT,
    p_percentage NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary = salary + (salary * p_percentage / 100)
    WHERE employeeid = p_empid;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Employee ID % not found', p_empid;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END;
$$;
CALL UpdateSalary(1,10);
SELECT * FROM employees;