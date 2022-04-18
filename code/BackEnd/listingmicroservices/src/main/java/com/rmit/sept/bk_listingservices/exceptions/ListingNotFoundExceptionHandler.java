package com.rmit.sept.bk_listingservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class ListingNotFoundExceptionHandler extends ResponseEntityExceptionHandler {



    @ExceptionHandler
    public final ResponseEntity<Object> handleListingNotFound(ListingNotFoundException ex, WebRequest request){
        ListingNotFoundResponse exceptionResponse = new ListingNotFoundResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

