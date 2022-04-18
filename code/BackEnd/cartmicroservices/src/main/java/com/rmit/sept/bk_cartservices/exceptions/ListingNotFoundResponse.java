package com.rmit.sept.bk_cartservices.exceptions;

public class ListingNotFoundResponse {

    private String errorMsg;

    public ListingNotFoundResponse(String book) {
        this.errorMsg = book;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}