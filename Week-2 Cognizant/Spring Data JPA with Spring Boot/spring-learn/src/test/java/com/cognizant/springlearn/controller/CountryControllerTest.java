package com.cognizant.springlearn.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetCountry() throws Exception {

        mockMvc.perform(get("/country"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("IN"))
                .andExpect(jsonPath("$.name").value("India"));

    }
    
    @Test
    void testGetAllCountries() throws Exception {

        mockMvc.perform(get("/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].code").value("US"))
                .andExpect(jsonPath("$[0].name").value("United States"));

    }
    
    @Test
    void testGetCountryByCode() throws Exception {

        mockMvc.perform(get("/countries/IN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("IN"))
                .andExpect(jsonPath("$.name").value("India"));

    }
    
    @Test
    void testAddCountry() throws Exception {

        String json = """
        {
            "code":"FR",
            "name":"France"
        }
        """;

        mockMvc.perform(
                post("/countries")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("FR"));

    }
    
    @Test
    void testValidation() throws Exception {

        String json = """
        {
            "code":"",
            "name":""
        }
        """;

        mockMvc.perform(
                post("/countries")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isBadRequest());

    }

}