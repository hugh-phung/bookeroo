package com.rmit.sept.bk_bookservices.Repositories;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    Book getById(Long id);

    List<Book> findByIsbnOrderByTitleAsc(String isbn);
    List<Book> findByTitleIgnoreCaseContainsOrderByTitleAsc(String title);
    List<Book> findByAuthorIgnoreCaseContainsOrderByTitleAsc(String author);
    List<Book> findByGenreIgnoreCaseContainsOrderByTitleAsc(String genre);
    List<Book> findAll();
    List<Book> findAllByOrderByTitleAsc();
}
