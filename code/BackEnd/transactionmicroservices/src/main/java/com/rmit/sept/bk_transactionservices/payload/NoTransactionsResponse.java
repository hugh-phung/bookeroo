package com.rmit.sept.bk_transactionservices.payload;

public class NoTransactionsResponse {
    private String results;

    public NoTransactionsResponse(String queryTerm) {
        this.results = "No transactions for " + queryTerm + "'.";
    }

    public String getResults() { return results; }

    public void setResults(String results) { this.results = results; }

}
