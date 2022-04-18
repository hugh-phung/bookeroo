package com.rmit.sept.bk_cartservices.exceptions;

public class ItemAlreadyInCartResponse {

    private String errorMsg;

    public ItemAlreadyInCartResponse(String book) {
        this.errorMsg = book;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}