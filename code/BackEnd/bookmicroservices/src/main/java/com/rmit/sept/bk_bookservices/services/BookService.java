package com.rmit.sept.bk_bookservices.services;


import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.exceptions.BookNotFoundException;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.payload.SearchResultsEmptyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;


    public Book saveBook(Book newBook){
        newBook.setTitle(newBook.getTitle().trim().replaceAll("\\s+"," "));
        newBook.setAuthor(newBook.getAuthor().trim().replaceAll("\\s+"," "));
        newBook.setGenre(newBook.getGenre().trim().replaceAll("\\s+"," "));
        return bookRepository.save(newBook);
    }

    public Book getBook (Long id) {
        Book book = bookRepository.getById(id);
        if (book == null) throw new BookNotFoundException("Book with id " + id + " not found");
        return book;
    }

    public ResponseEntity<?> getSearchResults(String searchTerm) {
        searchTerm = searchTerm.trim().replaceAll("\\s+"," ");
        Map<String, List<Book>> results = new HashMap<String, List<Book>>();

        if (!searchTerm.isEmpty()) {
            List<Book> byIsbn = bookRepository.findByIsbnOrderByTitleAsc(searchTerm);
            if (!byIsbn.isEmpty()) {
                results.put("isbn", byIsbn);
            }

            List<Book> byTitle = bookRepository.findByTitleIgnoreCaseContainsOrderByTitleAsc(searchTerm);
            if (!byTitle.isEmpty()) {
                results.put("title", byTitle);
            }

            List<Book> byAuthor = bookRepository.findByAuthorIgnoreCaseContainsOrderByTitleAsc(searchTerm);
            if (!byAuthor.isEmpty()) {
                results.put("author", bookRepository.findByAuthorIgnoreCaseContainsOrderByTitleAsc(searchTerm));
            }

            List<Book> byGenre = bookRepository.findByGenreIgnoreCaseContainsOrderByTitleAsc(searchTerm);
            if (!byGenre.isEmpty()) {
                results.put("genre", bookRepository.findByGenreIgnoreCaseContainsOrderByTitleAsc(searchTerm));
            }
        }

        if (results.isEmpty()) {
            return ResponseEntity.ok(new SearchResultsEmptyResponse(searchTerm));
        }
        return new ResponseEntity<Map<String, List<Book>>>(results, HttpStatus.OK);
    }

    public ResponseEntity<?> getBooksByGenre(String genre) {
        genre = genre.trim().replaceAll("\\s+"," ");
        List<Book> resultsList = null;

        if (!genre.isEmpty()) {
            resultsList = bookRepository.findByGenreIgnoreCaseContainsOrderByTitleAsc(genre);
        }
        if ((resultsList == null) || resultsList.isEmpty()) {
            return ResponseEntity.ok(new SearchResultsEmptyResponse(genre));
        }

//        Map<String, List<Book>> results = new HashMap<String, List<Book>>();
//        results.put("results", resultsList);
        return ResponseEntity.ok(resultsList);
    }

    public ResponseEntity<?> getAllBooks() {
        List<Book> books = bookRepository.findAllByOrderByTitleAsc();
        return ResponseEntity.ok(books);
    }
}
