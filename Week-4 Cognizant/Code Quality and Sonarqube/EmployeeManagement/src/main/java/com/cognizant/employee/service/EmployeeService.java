package com.cognizant.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.employee.entity.Employee;
import com.cognizant.employee.exception.ResourceNotFoundException;
import com.cognizant.employee.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Integer id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

    }

    public Employee updateEmployee(Employee employee) {

        if (!employeeRepository.existsById(employee.getId())) {

            throw new ResourceNotFoundException(
                    "Employee not found with id : " + employee.getId());

        }

        return employeeRepository.save(employee);

    }

    public void deleteEmployee(Integer id) {

        if (!employeeRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "Employee not found with id : " + id);

        }

        employeeRepository.deleteById(id);

    }

    public Employee getEmployeeByEmail(String email) {

        return employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with email : " + email));

    }

}