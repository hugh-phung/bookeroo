package com.rmit.sept.bk_cartservices.Repositories;

import com.rmit.sept.bk_cartservices.model.Listing;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends CrudRepository<Listing, Long> {

    Listing getById(Long id);
    List<Listing> findByIdIn(List<Long> ids);
}
