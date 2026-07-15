package com.cognizant.springlearn.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class Country {

    @NotBlank(message = "Country Code cannot be empty")
    @Size(min = 2, max = 2,
            message = "Country Code must contain exactly 2 characters")
    private String code;

    @NotBlank(message = "Country Name cannot be empty")
    @Size(min = 2,
            message = "Country Name should contain at least 2 characters")
    private String name;

    public Country() {
    }

    public Country(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Country [code=" + code + ", name=" + name + "]";
    }
}