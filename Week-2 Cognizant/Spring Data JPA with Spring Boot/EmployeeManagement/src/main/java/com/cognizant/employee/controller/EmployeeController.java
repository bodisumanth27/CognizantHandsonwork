package com.cognizant.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cognizant.employee.entity.Employee;
import com.cognizant.employee.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
@Validated
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public Employee saveEmployee(@Valid @RequestBody Employee employee) {

        return employeeService.saveEmployee(employee);

    }

    @GetMapping
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployees();

    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Integer id) {

        return employeeService.getEmployeeById(id);

    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Integer id,
            @Valid @RequestBody Employee employee) {

        employee.setId(id);

        return employeeService.updateEmployee(employee);

    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id) {

        employeeService.deleteEmployee(id);

        return "Employee Deleted Successfully";

    }

    @GetMapping("/email/{email}")
    public Employee getEmployeeByEmail(@PathVariable String email) {

        return employeeService.getEmployeeByEmail(email);

    }

}