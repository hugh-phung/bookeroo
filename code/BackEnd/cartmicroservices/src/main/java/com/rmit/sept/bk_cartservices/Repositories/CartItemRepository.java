package com.rmit.sept.bk_cartservices.Repositories;

import com.rmit.sept.bk_cartservices.model.CartItem;
import com.rmit.sept.bk_cartservices.model.CartItemPK;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem, CartItemPK> {

    CartItem getByUserIdAndListingId(Long userId, Long listingId);
    List<CartItem> findByUserId(Long userId);
}
