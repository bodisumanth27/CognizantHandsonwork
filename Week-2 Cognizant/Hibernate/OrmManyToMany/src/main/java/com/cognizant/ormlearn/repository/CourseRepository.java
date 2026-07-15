package com.cognizant.ormlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.ormlearn.model.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {

}