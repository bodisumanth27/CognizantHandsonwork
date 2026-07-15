package com.cognizant.springlearn.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.CountryService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import jakarta.validation.Valid;
@RestController
public class CountryController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    @GetMapping("/country")
    public Country getCountryIndia() {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        Country country =
                context.getBean("country", Country.class);

        LOGGER.info("END");

        return country;
    }

    @GetMapping("/countries")
    public List<Country> getAllCountries() {

        LOGGER.info("START");

        List<Country> list = countryService.getAllCountries();

        LOGGER.info("END");

        return list;
    }
    
    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) {

        LOGGER.info("START");

        Country country = countryService.getCountry(code);

        LOGGER.info("END");

        return country;
    }
    
    @PostMapping("/countries")
    public Country addCountry(@Valid
                              @RequestBody Country country) {

        LOGGER.info("START");

        Country newCountry =
                countryService.addCountry(country);

        LOGGER.info("END");

        return newCountry;
    }
    
    @PutMapping("/countries")
    public Country updateCountry(@Valid
                                 @RequestBody Country country) {

        LOGGER.info("START");

        Country updated =
                countryService.updateCountry(country);

        LOGGER.info("END");

        return updated;
    }
    
    @DeleteMapping("/countries/{code}")
    public String deleteCountry(@PathVariable String code) {

        LOGGER.info("START");

        boolean deleted =
                countryService.deleteCountry(code);

        LOGGER.info("END");

        if (deleted) {
            return "Country Deleted Successfully";
        }

        return "Country Not Found";
    }

}