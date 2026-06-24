CREATE TABLE IF NOT EXISTS employees (
    employeeid INT PRIMARY KEY,
    name VARCHAR(100),
    salary NUMERIC
);
INSERT INTO employees
VALUES
(1,'Alice',50000),
(2,'Bob',60000);
CREATE SCHEMA IF NOT EXISTS employeemanagement;
SELECT schema_name
FROM information_schema.schemata
WHERE schema_name='employeemanagement';
CREATE OR REPLACE PROCEDURE employeemanagement.hireemployee(
    p_employeeid INT,
    p_name VARCHAR,
    p_salary NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO employees(
        employeeid,
        name,
        salary
    )
    VALUES(
        p_employeeid,
        p_name,
        p_salary
    );

    RAISE NOTICE 'Employee Added Successfully';
END;
$$;
CREATE OR REPLACE PROCEDURE employeemanagement.updateemployee(
    p_employeeid INT,
    p_salary NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary = p_salary
    WHERE employeeid = p_employeeid;

    RAISE NOTICE 'Employee Updated Successfully';
END;
$$;
CREATE OR REPLACE FUNCTION employeemanagement.calculateannualsalary(
    p_employeeid INT
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    v_salary NUMERIC;
BEGIN
    SELECT salary
    INTO v_salary
    FROM employees
    WHERE employeeid = p_employeeid;

    RETURN v_salary * 12;
END;
$$;
CALL employeemanagement.hireemployee(
    3,
    'Rahul',
    50000
);
CALL employeemanagement.updateemployee(
    3,
    60000
);
SELECT employeemanagement.calculateannualsalary(3);
SELECT * FROM employees;