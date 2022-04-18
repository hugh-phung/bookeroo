package com.rmit.sept.bk_listingservices.exceptions;

public class ListingNotFoundResponse {

    private String listing;

    public ListingNotFoundResponse(String book) {
        this.listing = book;
    }

    public String getListing() {
        return listing;
    }

    public void setListing(String listing) {
        this.listing = listing;
    }
}