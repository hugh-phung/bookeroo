package com.rmit.sept.bk_bookservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class BookNotFoundExceptionHandler extends ResponseEntityExceptionHandler {



    @ExceptionHandler
    public final ResponseEntity<Object> handleBookNotFound(BookNotFoundException ex, WebRequest request){
        BookNotFoundResponse exceptionResponse = new BookNotFoundResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

