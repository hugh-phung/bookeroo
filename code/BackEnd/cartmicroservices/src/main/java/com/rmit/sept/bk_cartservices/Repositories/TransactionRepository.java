package com.rmit.sept.bk_cartservices.Repositories;

import com.rmit.sept.bk_cartservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> { }
