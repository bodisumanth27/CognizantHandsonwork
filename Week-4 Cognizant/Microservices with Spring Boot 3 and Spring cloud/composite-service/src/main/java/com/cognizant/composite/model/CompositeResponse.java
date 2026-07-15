package com.cognizant.composite.model;

public class CompositeResponse {

    private Account account;
    private Loan loan;

    public CompositeResponse() {
    }

    public CompositeResponse(Account account, Loan loan) {
        this.account = account;
        this.loan = loan;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }
}