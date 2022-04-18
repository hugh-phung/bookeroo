package com.rmit.sept.bk_cartservices.web;


import com.rmit.sept.bk_cartservices.Repositories.*;
import com.rmit.sept.bk_cartservices.model.CartItem;
import com.rmit.sept.bk_cartservices.model.Transaction;
import com.rmit.sept.bk_cartservices.payload.*;
import com.rmit.sept.bk_cartservices.services.MapValidationErrorService;
import com.rmit.sept.bk_cartservices.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin
@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private CartService cartService;


    @PostMapping("/additem")
    public ResponseEntity<?> addTransaction(@Valid @RequestBody CartItem cartItem, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        CartItem newCartItem = cartService.saveCartItem(cartItem);

        return new ResponseEntity<CartItem>(newCartItem, HttpStatus.CREATED);
    }


    @PostMapping("/removeitem")
    public ResponseEntity<?> removeItem(@Valid @RequestBody CartItem cartItem, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        cartService.removeCartItem(cartItem);

        return ResponseEntity.ok("");
    }


    @PostMapping("/getcart")
    public ResponseEntity<?> getCart(@Valid @RequestBody UserCartRequest userCartRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        UserCartResponse userCart = cartService.getCart(userCartRequest.getUserId());

        return new ResponseEntity<UserCartResponse>(userCart, HttpStatus.OK);
    }


    @PostMapping("/clearcart")
    public ResponseEntity<?> clearCart(@Valid @RequestBody UserCartRequest userCartRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        cartService.clearCart(userCartRequest.getUserId());
        return ResponseEntity.ok("");
    }


    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@Valid @RequestBody CheckoutRequest checkoutRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        boolean checkoutSuccess = cartService.checkout(checkoutRequest.getUserId(), checkoutRequest.getUsername());
        if (checkoutSuccess) {
            return ResponseEntity.ok(new CheckoutResponse("Success"));
        } else {
            return new ResponseEntity<CheckoutResponse>(new CheckoutResponse("Failed (no change)"), HttpStatus.BAD_REQUEST);
        }
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonParseError() {
        JsonParseErrorResponse response = new JsonParseErrorResponse("JSON parse error: ensure numerical field values are valid.");
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

}