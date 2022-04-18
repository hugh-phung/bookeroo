package com.rmit.sept.bk_bookservices.web;


import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlRequest;
import com.rmit.sept.bk_bookservices.payload.GetBookRequest;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlResponse;
import com.rmit.sept.bk_bookservices.payload.SearchRequest;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookservices.services.BookService;
import com.rmit.sept.bk_bookservices.web.LoadBooks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;


@CrossOrigin
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;


    @PostMapping("/addbook")
    public ResponseEntity<?> addBook(@Valid @RequestBody Book book, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book newBook = bookService.saveBook(book);

        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @PostMapping("/populateData")
    public ResponseEntity<?> populateData() {

        if (!bookRepository.findAll().isEmpty())
        {
            return new ResponseEntity<String>("Already populated with data", HttpStatus.CREATED);
        }

        LoadBooks loadBooks = new LoadBooks(bookService);
        loadBooks.populate();

        return new ResponseEntity<String>("Populated", HttpStatus.CREATED);
    }


    @PostMapping("/getbook")
    public ResponseEntity<?> getBook(@Valid @RequestBody GetBookRequest getBookRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book book = bookService.getBook(getBookRequest.getId());

        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }


    @PostMapping("/getimguploadurl")
    public ResponseEntity<?> getImgUploadUrl(@Valid @RequestBody ImgUploadUrlRequest imgUploadUrlRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book book = bookService.getBook(imgUploadUrlRequest.getBookId());

        String url = "http://localhost:8089/api/upload/" + book.getId();
        return ResponseEntity.ok(new ImgUploadUrlResponse(url));
    }


    @PostMapping("/searchbooks")
    public ResponseEntity<?> searchForBooks(@Valid @RequestBody SearchRequest searchRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return bookService.getSearchResults(searchRequest.getSearchTerm());
    }


    @PostMapping("/booksbygenre")
    public ResponseEntity<?> getBooksByGenre(@Valid @RequestBody SearchRequest genreRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return bookService.getBooksByGenre(genreRequest.getSearchTerm());
    }


    @GetMapping("/getallbooks")
    public ResponseEntity<?> getAllBooks() {
        return bookService.getAllBooks();
    }
}