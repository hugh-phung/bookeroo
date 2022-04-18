package com.rmit.sept.bk_listingservices.services;


import com.rmit.sept.bk_listingservices.Repositories.ListingRepository;
import com.rmit.sept.bk_listingservices.exceptions.ListingNotFoundException;
import com.rmit.sept.bk_listingservices.model.Listing;
import com.rmit.sept.bk_listingservices.payload.NoListingsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ListingService {

    @Autowired
    private ListingRepository listingRepository;


    public Listing saveListing(Listing newListing, boolean sold) {
        newListing.setSold(sold);
        return listingRepository.save(newListing);
    }

    public Listing getListing(Long id) {
        Listing book = listingRepository.getById(id);
        if (book == null) throw new ListingNotFoundException("Listing with id " + id + " not found");
        return book;
    }

    public ResponseEntity<?> getListingsByBookId(Long bookId) {
        Map<String, List<Listing>> listings = new HashMap<String, List<Listing>>();

        List<Listing> typeNew = listingRepository.findByBookIdAndTypeAndSoldIsFalseOrderByPriceAsc(bookId, "new");
        if (!typeNew.isEmpty()) {
            listings.put("new", typeNew);
        }
        List<Listing> typeUsed = listingRepository.findByBookIdAndTypeAndSoldIsFalseOrderByPriceAsc(bookId, "used");
        if (!typeUsed.isEmpty()) {
            listings.put("used", typeUsed);
        }

        if (listings.isEmpty()) {
            return ResponseEntity.ok(new NoListingsResponse("bookId '" + bookId.toString()));
        }
        return new ResponseEntity<Map<String, List<Listing>>>(listings, HttpStatus.OK);
    }

    public ResponseEntity<?> getListingsBySeller(String seller) {
        List<Listing> listings = null;

        if (!seller.isEmpty()) {
            listings = listingRepository.findBySellerOrderByIdDesc(seller);
        }
        if ((listings == null) || listings.isEmpty()) {
            return ResponseEntity.ok(new NoListingsResponse("seller '" + seller));
        }

        return ResponseEntity.ok(listings);
    }

    public Listing markListingAsSold(Long id) {
        Listing listing = getListing(id);
        return saveListing(listing, true);
    }


}
