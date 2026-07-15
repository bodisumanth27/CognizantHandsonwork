package com.cognizant.ormlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.ormlearn.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}