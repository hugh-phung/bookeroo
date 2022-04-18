package com.rmit.sept.bk_transactionservices.exceptions;

public class TransactionNotFoundResponse {

    private String listing;

    public TransactionNotFoundResponse(String book) {
        this.listing = book;
    }

    public String getListing() {
        return listing;
    }

    public void setListing(String listing) {
        this.listing = listing;
    }
}