package com.cognizant.composite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cognizant.composite.client.AccountClient;
import com.cognizant.composite.client.LoanClient;
import com.cognizant.composite.model.Account;
import com.cognizant.composite.model.CompositeResponse;
import com.cognizant.composite.model.Loan;

@RestController
@RequestMapping("/customer")
public class CompositeController {

    @Autowired
    private AccountClient accountClient;

    @Autowired
    private LoanClient loanClient;

    @GetMapping("/{accountNo}/{loanNo}")
    public CompositeResponse getCustomerDetails(
            @PathVariable String accountNo,
            @PathVariable String loanNo) {

        Account account = accountClient.getAccount(accountNo);

        Loan loan = loanClient.getLoan(loanNo);

        return new CompositeResponse(account, loan);
    }

}