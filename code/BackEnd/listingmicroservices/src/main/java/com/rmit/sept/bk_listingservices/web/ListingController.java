package com.rmit.sept.bk_listingservices.web;


import com.rmit.sept.bk_listingservices.Repositories.ListingRepository;
import com.rmit.sept.bk_listingservices.model.Listing;
import com.rmit.sept.bk_listingservices.payload.GetListingRequest;
import com.rmit.sept.bk_listingservices.payload.JsonParseErrorResponse;
import com.rmit.sept.bk_listingservices.payload.ListingsByBookIdRequest;
import com.rmit.sept.bk_listingservices.payload.ListingsBySellerRequest;
import com.rmit.sept.bk_listingservices.services.MapValidationErrorService;
import com.rmit.sept.bk_listingservices.services.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin
@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private ListingService listingService;

    @Autowired
    private ListingRepository listingRepository;


    @PostMapping("/addlisting")
    public ResponseEntity<?> addListing(@Valid @RequestBody Listing listing, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Listing newListing = listingService.saveListing(listing, false);

        return new ResponseEntity<Listing>(newListing, HttpStatus.CREATED);
    }


    @PostMapping("/getlisting")
    public ResponseEntity<?> getListing(@Valid @RequestBody GetListingRequest getListingRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Listing listing = listingService.getListing(getListingRequest.getId());

        return new ResponseEntity<Listing>(listing, HttpStatus.OK);
    }


    @PostMapping("/getlistingsbybookid")
    public ResponseEntity<?> getListingsByBookId(@Valid @RequestBody ListingsByBookIdRequest listingsByBookIdRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return listingService.getListingsByBookId(listingsByBookIdRequest.getBookId());
    }


    @PostMapping("/getlistingsbyseller")
    public ResponseEntity<?> getListingsBySeller(@Valid @RequestBody ListingsBySellerRequest listingsBySellerRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return listingService.getListingsBySeller(listingsBySellerRequest.getSeller());
    }


    @PostMapping("/marklistingassold")
    public ResponseEntity<?> markListingAsSold(@Valid @RequestBody GetListingRequest listingRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Listing listing = listingService.markListingAsSold(listingRequest.getId());

        return new ResponseEntity<Listing>(listing, HttpStatus.OK);
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonParseError() {
        JsonParseErrorResponse response = new JsonParseErrorResponse("JSON parse error: ensure numerical field values are valid.");
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

}