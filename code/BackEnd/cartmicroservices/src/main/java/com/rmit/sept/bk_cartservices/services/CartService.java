package com.rmit.sept.bk_cartservices.services;


import com.rmit.sept.bk_cartservices.Repositories.*;
import com.rmit.sept.bk_cartservices.exceptions.ItemAlreadyInCartException;
import com.rmit.sept.bk_cartservices.exceptions.ListingNotFoundException;
import com.rmit.sept.bk_cartservices.exceptions.ListingSoldException;
import com.rmit.sept.bk_cartservices.model.*;
import com.rmit.sept.bk_cartservices.payload.UserCartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private BookRepository bookRepository;


    public CartItem saveCartItem(CartItem cartItem) {
        Listing listing = listingRepository.getById(cartItem.getListingId());
        if (listing == null) {
            throw new ListingNotFoundException("Listing with id " + cartItem.getListingId() + " not found");
        }
        if (listing.getSold()) {
            throw new ListingSoldException("Listing with id " + cartItem.getListingId() + " is already sold");
        }
        if (cartItemRepository.getByUserIdAndListingId(cartItem.getUserId(), cartItem.getListingId()) != null) {
            throw new ItemAlreadyInCartException("Listing with id " + cartItem.getListingId() + " is already in cart");
        }
        return cartItemRepository.save(cartItem);
    }

    public void removeCartItem(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    public UserCartResponse getCart(Long userId) {
        UserCartResponse userCart = new UserCartResponse(userId);
        List<CartItemDetails> userCartItemsList = userCart.getItemsList();

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        for (CartItem cartItem : cartItems) {
            CartItemDetails cartItemDetails = new CartItemDetails();

            cartItemDetails.setListingId(cartItem.getListingId());
            Listing listing = listingRepository.getById(cartItem.getListingId());
            if (listing == null) {
                cartItemDetails.setStatus(CartItemDetails.STATUS_LISTING_NOT_FOUND);
            } else {
                Book book = bookRepository.getById(listing.getBookId());
                if (book == null) {
                    cartItemDetails.setStatus(CartItemDetails.STATUS_BOOK_NOT_FOUND);
                } else {
                    cartItemDetails.setBookId(listing.getBookId());
                    cartItemDetails.setTitle(book.getTitle());
                    cartItemDetails.setPrice(listing.getPrice());
                    cartItemDetails.setSeller(listing.getSeller());
                    cartItemDetails.setImgURL(book.getImgURL());
                    cartItemDetails.setSold(listing.getSold());

                    if (listing.getSold()) {
                        cartItemDetails.setStatus(CartItemDetails.STATUS_LISTING_SOLD);
                    }
                }
            }
            userCartItemsList.add(cartItemDetails);
        }
        userCart.setNumItems(userCartItemsList.size());

        return userCart;
    }

    public void clearCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        cartItemRepository.deleteAll(cartItems);
    }

    public boolean checkout(Long userId, String username) {
        List<CartItemDetails> userCart = getCart(userId).getItemsList();
        // if cart empty, abort checkout
        if (userCart.isEmpty()) {
            return false;
        }

        List<Long> listingIds = new ArrayList<Long>();
        for (CartItemDetails cartItemDetails : userCart) {
            // if listing not found, book not found, or listing sold, abort checkout
            if (!cartItemDetails.getStatus().equals(CartItemDetails.STATUS_OK)) {
                return false;
            }
            listingIds.add(cartItemDetails.getListingId());
        }
        List<Listing> listings = listingRepository.findByIdIn(listingIds);

        // create transactions and update listings as sold
        for (Listing listing : listings) {
            listing.setSold(true);
            listingRepository.save(listing);

            Transaction transaction = new Transaction();
            transaction.setListingId(listing.getId());
            transaction.setBuyer(username);
            transaction.setSeller(listing.getSeller());
            transaction.setDate(new Date());
            transaction.setStatus(Transaction.STATUS_CANCELLABLE);
            transactionRepository.save(transaction);
        }

        // empty cart
        clearCart(userId);

        return true;
    }

}
