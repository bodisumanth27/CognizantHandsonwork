package com.cognizant.ormlearn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;

@RestController
public class CountryController {

    @Autowired
    private CountryService countryService;

    // ==========================
    // Pagination
    // ==========================
    @GetMapping("/countries/page")
    public Page<Country> getCountriesPage(
            @RequestParam int page,
            @RequestParam int size) {

        return countryService.getCountriesPage(page, size);
    }

    // ==========================
    // Sorting Ascending
    // ==========================
    @GetMapping("/countries/sort/asc")
    public List<Country> getCountriesAsc() {

        return countryService.getCountriesSortedByNameAsc();
    }

    // ==========================
    // Sorting Descending
    // ==========================
    @GetMapping("/countries/sort/desc")
    public List<Country> getCountriesDesc() {

        return countryService.getCountriesSortedByNameDesc();
    }
}