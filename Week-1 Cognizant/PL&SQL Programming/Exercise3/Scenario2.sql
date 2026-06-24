 CREATE TABLE employees (
    employeeid INT PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(50),
    salary NUMERIC,
    department VARCHAR(50),
    hiredate DATE
);
INSERT INTO employees
VALUES
(1,'Alice Johnson','Manager',70000,'HR','2015-06-15'),
(2,'Bob Brown','Developer',60000,'IT','2017-03-20');
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department VARCHAR,
    p_bonus NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary = salary + (salary * p_bonus / 100)
    WHERE department = p_department;

    RAISE NOTICE 'Bonus Updated Successfully';
END;
$$;
CALL UpdateEmployeeBonus('IT',10);
SELECT * FROM employees;