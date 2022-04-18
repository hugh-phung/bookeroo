package com.rmit.sept.bk_cartservices.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ItemAlreadyInCartException extends RuntimeException {

    public ItemAlreadyInCartException(String message) {
        super(message);
    }
}
