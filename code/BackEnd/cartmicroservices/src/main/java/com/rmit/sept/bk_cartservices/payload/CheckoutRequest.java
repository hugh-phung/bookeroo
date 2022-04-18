package com.rmit.sept.bk_cartservices.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class CheckoutRequest {

    @NotNull(message = "ID is required")
    @Positive(message = "ID invalid")
    private Long userId;
    @NotEmpty(message = "username is required")
    private String username;

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }
}