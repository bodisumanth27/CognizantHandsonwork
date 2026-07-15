package com.cognizant.composite.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.cognizant.composite.model.Loan;

@FeignClient(name = "loan-service")
public interface LoanClient {

    @GetMapping("/loans/{number}")
    Loan getLoan(@PathVariable String number);

}