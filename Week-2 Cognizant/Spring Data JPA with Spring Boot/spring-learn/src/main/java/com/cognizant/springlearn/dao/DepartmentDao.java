package com.cognizant.springlearn.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cognizant.springlearn.model.Department;

@Repository
public class DepartmentDao {

    private static final List<Department> DEPARTMENT_LIST = new ArrayList<>();

    static {

        DEPARTMENT_LIST.add(new Department(1, "IT"));
        DEPARTMENT_LIST.add(new Department(2, "HR"));
        DEPARTMENT_LIST.add(new Department(3, "Finance"));
        DEPARTMENT_LIST.add(new Department(4, "Admin"));

    }

    public List<Department> getAllDepartments() {
        return DEPARTMENT_LIST;
    }
}