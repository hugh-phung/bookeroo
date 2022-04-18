package com.rmit.sept.bk_bookservices.exceptions;

public class BookNotFoundResponse {

    private String book;

    public BookNotFoundResponse(String book) {
        this.book = book;
    }

    public String getBook() {
        return book;
    }

    public void setBook(String book) {
        this.book = book;
    }
}