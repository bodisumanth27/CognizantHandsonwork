package com.cognizant.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.security.entity.Employee;
import com.cognizant.security.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployee(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee updateEmployee(Integer id, Employee employee) {

        Employee old = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));

        old.setName(employee.getName());
        old.setDepartment(employee.getDepartment());
        old.setSalary(employee.getSalary());

        return repository.save(old);
    }

    public void deleteEmployee(Integer id) {
        repository.deleteById(id);
    }
}