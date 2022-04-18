package com.rmit.sept.bk_cartservices.exceptions;

public class ListingSoldResponse {

    private String errorMsg;

    public ListingSoldResponse(String book) {
        this.errorMsg = book;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}