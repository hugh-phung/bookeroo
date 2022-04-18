package com.rmit.sept.bk_bookservices.payload;

public class SearchResultsEmptyResponse {
    private String results;

    public SearchResultsEmptyResponse(String searchTerm) {
        this.results = "No results found for '" + searchTerm + "'.";
    }

    public String getResults() { return results; }

    public void setResults(String results) { this.results = results; }

}
