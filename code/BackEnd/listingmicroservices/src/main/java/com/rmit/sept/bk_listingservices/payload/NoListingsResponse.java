package com.rmit.sept.bk_listingservices.payload;

public class NoListingsResponse {
    private String results;

    public NoListingsResponse(String queryTerm) {
        this.results = "No listings for " + queryTerm + "'.";
    }

    public String getResults() { return results; }

    public void setResults(String results) { this.results = results; }

}
