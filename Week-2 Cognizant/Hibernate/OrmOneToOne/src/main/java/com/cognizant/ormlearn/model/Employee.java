package com.cognizant.ormlearn.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    private int id;

    private String name;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private Passport passport;

    public Employee() {
    }

    public Employee(int id, String name) {
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

    public Passport getPassport() {
        return passport;
    }

    public void setPassport(Passport passport) {
        this.passport = passport;
        if (passport != null) {
            passport.setEmployee(this);
        }
    }

    @Override
    public String toString() {
        return "Employee [id=" + id +
                ", name=" + name + "]";
    }
}