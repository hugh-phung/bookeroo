package com.rmit.sept.bk_listingservices.payload;

import javax.validation.constraints.NotEmpty;

public class ListingsBySellerRequest {

    @NotEmpty(message = "seller is required")
    private String seller;

    public String getSeller() { return seller; }

    public void setSeller(String seller) { this.seller = seller; }
}
