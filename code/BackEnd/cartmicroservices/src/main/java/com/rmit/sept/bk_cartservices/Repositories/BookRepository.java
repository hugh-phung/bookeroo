package com.rmit.sept.bk_cartservices.Repositories;

import com.rmit.sept.bk_cartservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    Book getById(Long id);

}
