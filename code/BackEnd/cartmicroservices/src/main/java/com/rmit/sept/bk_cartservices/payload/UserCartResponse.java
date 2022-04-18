package com.rmit.sept.bk_cartservices.payload;

import com.rmit.sept.bk_cartservices.model.CartItemDetails;

import java.util.ArrayList;
import java.util.List;


public class UserCartResponse {

    private Long userId;
    private List<CartItemDetails> itemsList;
    private Integer numItems;

    public UserCartResponse() { this.itemsList = new ArrayList<CartItemDetails>(); }

    public UserCartResponse(Long userId) {
        this();
        this.userId = userId;
    }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public List<CartItemDetails> getItemsList() { return itemsList; }

    public Integer getNumItems() { return numItems; }

    public void setNumItems(Integer numItems) { this.numItems = numItems; }
}
