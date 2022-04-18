package com.rmit.sept.bk_listingservices.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class GetListingRequest {

    @NotNull(message = "ID is required")
    @Positive(message = "ID invalid")
    private Long id;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }
}