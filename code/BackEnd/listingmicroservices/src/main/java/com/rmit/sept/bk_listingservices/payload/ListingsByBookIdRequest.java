package com.rmit.sept.bk_listingservices.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class ListingsByBookIdRequest {

    @NotNull(message = "ID is required")
    @Positive(message = "ID invalid")
    private Long bookId;

    public Long getBookId() { return bookId; }

    public void setBookId(Long bookId) { this.bookId = bookId; }
}