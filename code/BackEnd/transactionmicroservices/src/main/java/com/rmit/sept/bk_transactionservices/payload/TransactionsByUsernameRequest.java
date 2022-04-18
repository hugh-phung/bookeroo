package com.rmit.sept.bk_transactionservices.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class TransactionsByUsernameRequest {

    @NotBlank(message = "username is required")
    private String username;

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }
}