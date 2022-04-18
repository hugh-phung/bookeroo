package com.rmit.sept.bk_cartservices.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UserCartRequest {

    @NotNull(message = "ID is required")
    @Positive(message = "ID invalid")
    private Long userId;

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }
}