package com.rmit.sept.bk_transactionservices.services;


import com.rmit.sept.bk_transactionservices.Repositories.ListingRepository;
import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.exceptions.TransactionNotFoundException;
import com.rmit.sept.bk_transactionservices.model.Listing;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.payload.NoTransactionsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class TransactionService {

    private static final long CANCELLABLE_DURATION_IN_HOURS = 2;
    private static final long CANCELLABLE_DURATION_IN_MILLIS = TimeUnit.HOURS.toMillis(CANCELLABLE_DURATION_IN_HOURS);


    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ListingRepository listingRepository;


    public Transaction getTransaction(Long id) {
        Transaction transaction = transactionRepository.getById(id);
        if (transaction == null) throw new TransactionNotFoundException("Transaction with id " + id + " not found");

        updateCancellableIfDurationHasElapsed(transaction, new Date().getTime());
        return transaction;
    }

    public ResponseEntity<?> getTransactionsByUsername(String username) {
        Map<String, List<Transaction>> transactions = new HashMap<String, List<Transaction>>();

        List<Transaction> asSeller = transactionRepository.findBySeller(username);
        if (!asSeller.isEmpty()) {
            updateCancellableIfDurationHasElapsed(asSeller);
            transactions.put("asSeller", asSeller);
        }
        List<Transaction> asBuyer = transactionRepository.findByBuyer(username);
        if (!asBuyer.isEmpty()) {
            updateCancellableIfDurationHasElapsed(asBuyer);
            transactions.put("asBuyer", asBuyer);
        }

        if (transactions.isEmpty()) {
            return ResponseEntity.ok(new NoTransactionsResponse("user '" + username));
        }
        return new ResponseEntity<Map<String, List<Transaction>>>(transactions, HttpStatus.OK);
    }

    public boolean cancelTransaction(Long id) {
        Transaction transaction = getTransaction(id);
        if (!transaction.getStatus().equals(Transaction.STATUS_CANCELLABLE)) {
            return false;
        }
        transaction.setStatus(Transaction.STATUS_CANCELLED);
        transactionRepository.save(transaction);

        // allow listing to be shown again (no longer 'sold')
        Listing listing = listingRepository.getById(transaction.getListingId());
        if (listing != null) {
            listing.setSold(false);
            listingRepository.save(listing);
        }

        return true;
    }

    private void updateCancellableIfDurationHasElapsed(List<Transaction> transactions) {
        long nowInMillis = new Date().getTime();

        for (Transaction transaction : transactions) {
            updateCancellableIfDurationHasElapsed(transaction, nowInMillis);
        }
    }

    private void updateCancellableIfDurationHasElapsed(Transaction transaction, long nowInMillis) {
        if (transaction.getStatus().equals(Transaction.STATUS_CANCELLABLE)) {
            if ((transaction.getDate().getTime() + CANCELLABLE_DURATION_IN_MILLIS) < nowInMillis) {
                transaction.setStatus(Transaction.STATUS_CONFIRMED);
                transactionRepository.save(transaction);
            }
        }
    }
}
