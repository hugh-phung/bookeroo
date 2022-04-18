package com.rmit.sept.bk_cartservices.payload;

public class CheckoutResponse {
    private String checkoutResult;

    public CheckoutResponse(String message) {
        this.checkoutResult = message;
    }

    public String getCheckoutResult() { return checkoutResult; }

    public void setCheckoutResult(String checkoutResult) { this.checkoutResult = checkoutResult; }

}
