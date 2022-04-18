package com.rmit.sept.bk_transactionservices.payload;

public class CancelResponse {
    private String cancelResult;

    public CancelResponse(String message) {
        this.cancelResult = message;
    }

    public String getCancelResult() { return cancelResult; }

    public void setCancelResult(String cancelResult) { this.cancelResult = cancelResult; }

}
