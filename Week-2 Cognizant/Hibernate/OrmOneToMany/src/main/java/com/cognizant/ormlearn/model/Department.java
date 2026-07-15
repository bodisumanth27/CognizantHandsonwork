package com.cognizant.ormlearn.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "department")
public class Department {

    @Id
    private int id;

    private String name;

    @OneToMany(mappedBy = "department",
            cascade = CascadeType.ALL)
    private List<Employee> employees = new ArrayList<>();

    public Department() {
    }

    public Department(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {

        this.employees = employees;

        if (employees != null) {

            for (Employee employee : employees) {

                employee.setDepartment(this);

            }

        }
    }

    @Override
    public String toString() {
        return "Department [id=" + id +
                ", name=" + name + "]";
    }
}