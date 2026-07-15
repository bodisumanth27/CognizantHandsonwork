package com.cognizant.springlearn.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.springlearn.model.Country;

@Service
public class CountryService {

    private static final List<Country> COUNTRY_LIST = new ArrayList<>();

    static {

        COUNTRY_LIST.add(new Country("US", "United States"));
        COUNTRY_LIST.add(new Country("DE", "Germany"));
        COUNTRY_LIST.add(new Country("IN", "India"));
        COUNTRY_LIST.add(new Country("JP", "Japan"));

    }

    public List<Country> getAllCountries() {
        return COUNTRY_LIST;
    }
    
    public Country getCountry(String code) {

        for (Country country : COUNTRY_LIST) {

            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }

        }

        return null;
    }
    
    public Country addCountry(Country country) {

        COUNTRY_LIST.add(country);

        return country;

    }
    
    public Country updateCountry(Country country) {

        for (Country c : COUNTRY_LIST) {

            if (c.getCode().equalsIgnoreCase(country.getCode())) {

                c.setName(country.getName());

                return c;
            }
        }

        return null;
    }
    
    public boolean deleteCountry(String code) {

        return COUNTRY_LIST.removeIf(
                country -> country.getCode().equalsIgnoreCase(code));

    }
}