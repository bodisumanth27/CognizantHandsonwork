package com.cognizant.composite.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.cognizant.composite.model.Account;

@FeignClient(name = "account-service")
public interface AccountClient {

    @GetMapping("/accounts/{number}")
    Account getAccount(@PathVariable String number);

}