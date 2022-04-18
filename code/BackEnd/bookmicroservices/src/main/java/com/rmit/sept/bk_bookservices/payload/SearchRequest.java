package com.rmit.sept.bk_bookservices.payload;

import javax.validation.constraints.NotEmpty;

public class SearchRequest {

    @NotEmpty(message = "searchTerm is required")
    private String searchTerm;

    public String getSearchTerm() { return searchTerm; }

    public void setSearchTerm(String searchTerm) { this.searchTerm = searchTerm; }
}
