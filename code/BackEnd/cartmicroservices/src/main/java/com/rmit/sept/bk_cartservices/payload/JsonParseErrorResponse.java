package com.rmit.sept.bk_cartservices.payload;

public class JsonParseErrorResponse {
    private String message;

    public JsonParseErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

}
