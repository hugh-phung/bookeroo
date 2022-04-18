package com.rmit.sept.bk_cartservices.model;

import java.io.Serializable;
import java.util.Objects;

public class CartItemPK implements Serializable {

    private Long userId;
    private Long listingId;

    public CartItemPK() { }

    @Override
    public boolean equals(Object other) {
        if (other instanceof CartItemPK) {
            CartItemPK otherCasted = (CartItemPK) other;
            if (this.userId.equals(otherCasted.userId) && this.listingId.equals(otherCasted.listingId)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, listingId);
    }
}
