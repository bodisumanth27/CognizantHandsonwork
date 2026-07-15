package com.cognizant.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.security.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}