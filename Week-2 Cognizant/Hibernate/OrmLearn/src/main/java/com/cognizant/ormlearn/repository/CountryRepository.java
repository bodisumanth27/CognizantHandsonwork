package com.cognizant.ormlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.ormlearn.model.Country;

public interface CountryRepository extends JpaRepository<Country, String> {

    // Derived Query
    Optional<Country> findByName(String name);

    // JPQL Query
    @Query("SELECT c FROM Country c")
    List<Country> getAllCountries();

    @Query("SELECT c FROM Country c WHERE c.code = :code")
    Country getCountryByCode(@Param("code") String code);

    // Native Query
    @Query(value = "SELECT * FROM country", nativeQuery = true)
    List<Country> getAllCountriesNative();

    @Query(value = "SELECT * FROM country WHERE code = :code", nativeQuery = true)
    Country getCountryByCodeNative(@Param("code") String code);

    // JPQL Update
    @Transactional
    @Modifying
    @Query("UPDATE Country c SET c.name = :name WHERE c.code = :code")
    int updateCountry(@Param("code") String code,
                      @Param("name") String name);

    // JPQL Delete
    @Transactional
    @Modifying
    @Query("DELETE FROM Country c WHERE c.code = :code")
    int deleteCountry(@Param("code") String code);
}