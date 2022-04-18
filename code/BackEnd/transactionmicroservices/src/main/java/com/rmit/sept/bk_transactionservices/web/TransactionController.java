package com.rmit.sept.bk_transactionservices.web;


import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.payload.CancelResponse;
import com.rmit.sept.bk_transactionservices.payload.TransactionByIdRequest;
import com.rmit.sept.bk_transactionservices.payload.JsonParseErrorResponse;
import com.rmit.sept.bk_transactionservices.payload.TransactionsByUsernameRequest;
import com.rmit.sept.bk_transactionservices.services.MapValidationErrorService;
import com.rmit.sept.bk_transactionservices.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionRepository transactionRepository;


    @PostMapping("/gettransaction")
    public ResponseEntity<?> getTransaction(@Valid @RequestBody TransactionByIdRequest transactionByIdRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Transaction transaction = transactionService.getTransaction(transactionByIdRequest.getId());

        return new ResponseEntity<Transaction>(transaction, HttpStatus.OK);
    }


    @PostMapping("/gettransactionsbyusername")
    public ResponseEntity<?> getTransactionsByUsername(@Valid @RequestBody TransactionsByUsernameRequest transactionsByUsernameRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return transactionService.getTransactionsByUsername(transactionsByUsernameRequest.getUsername());
    }


    @PostMapping("/canceltransaction")
    public ResponseEntity<?> cancelTransaction(@Valid @RequestBody TransactionByIdRequest transactionByIdRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        boolean cancelSuccess = transactionService.cancelTransaction(transactionByIdRequest.getId());
        if (cancelSuccess) {
            return ResponseEntity.ok(new CancelResponse("Success (transaction cancelled)"));
        } else {
            return new ResponseEntity<CancelResponse>(new CancelResponse("Failed (transaction status is not 'cancellable')"), HttpStatus.BAD_REQUEST);
        }
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonParseError() {
        JsonParseErrorResponse response = new JsonParseErrorResponse("JSON parse error: ensure numerical field values are valid.");
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

}