package com.cognizant.ormlearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "passport")
public class Passport {

    @Id
    private int id;

    private String passportNumber;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public Passport() {
    }

    public Passport(int id, String passportNumber) {
        this.id = id;
        this.passportNumber = passportNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Passport [id=" + id +
                ", passportNumber=" + passportNumber + "]";
    }
}