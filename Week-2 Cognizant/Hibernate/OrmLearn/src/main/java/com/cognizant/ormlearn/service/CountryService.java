package com.cognizant.ormlearn.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.repository.CountryRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    // Get All Countries
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Get Country by Code
    public Country getCountry(String code) {

        Optional<Country> country = countryRepository.findById(code);

        return country.orElse(null);
    }

    // Save Country
    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    // Delete using JPQL
    public int deleteCountry(String code) {
        return countryRepository.deleteCountry(code);
    }

    // Check Exists
    public boolean countryExists(String code) {
        return countryRepository.existsById(code);
    }

    // Derived Query
    public Country getCountryByName(String name) {
        return countryRepository.findByName(name).orElse(null);
    }

    // JPQL
    public List<Country> getCountriesJPQL() {
        return countryRepository.getAllCountries();
    }

    public Country getCountryJPQL(String code) {
        return countryRepository.getCountryByCode(code);
    }

    // Native Query
    public List<Country> getAllCountriesNative() {
        return countryRepository.getAllCountriesNative();
    }

    public Country getCountryByCodeNative(String code) {
        return countryRepository.getCountryByCodeNative(code);
    }

    // JPQL Update
    public int updateCountry(String code, String name) {
        return countryRepository.updateCountry(code, name);
    }
    
 // ===============================
 // Pagination
 // ===============================

 public Page<Country> getCountriesPage(int page, int size) {

     Pageable pageable = PageRequest.of(page, size);

     return countryRepository.findAll(pageable);
 }

 // ===============================
 // Sorting Ascending
 // ===============================

 public List<Country> getCountriesSortedByNameAsc() {

     return countryRepository.findAll(
             Sort.by(Sort.Direction.ASC, "name"));
 }

 // ===============================
 // Sorting Descending
 // ===============================

 public List<Country> getCountriesSortedByNameDesc() {

     return countryRepository.findAll(
             Sort.by(Sort.Direction.DESC, "name"));
 }
}