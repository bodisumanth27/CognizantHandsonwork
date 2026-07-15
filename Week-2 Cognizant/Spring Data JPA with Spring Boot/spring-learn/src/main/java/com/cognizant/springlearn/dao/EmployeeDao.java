package com.cognizant.springlearn.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

import com.cognizant.springlearn.model.Employee;

@Repository
public class EmployeeDao {

    private static final List<Employee> EMPLOYEE_LIST =
            new ArrayList<>();

    public EmployeeDao() {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("employee.xml");

        EMPLOYEE_LIST.add(context.getBean("emp1", Employee.class));
        EMPLOYEE_LIST.add(context.getBean("emp2", Employee.class));
        EMPLOYEE_LIST.add(context.getBean("emp3", Employee.class));

    }

    public List<Employee> getAllEmployees() {

        return EMPLOYEE_LIST;

    }

}