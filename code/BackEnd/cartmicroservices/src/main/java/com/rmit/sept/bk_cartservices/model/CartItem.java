package com.rmit.sept.bk_cartservices.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@IdClass(CartItemPK.class)
public class CartItem {
    @Id
    @NotNull(message = "userId is required")
    @Positive(message = "userId must be positive")
    private Long userId;
    @Id
    @NotNull(message = "listingId is required")
    @Positive(message = "listingId must be positive")
    private Long listingId;

    private Date create_At;
    private Date update_At;

    public CartItem() { }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public Long getListingId() { return listingId; }

    public void setListingId(Long listingId) { this.listingId = listingId; }

    @PrePersist
    protected void onCreate() { this.create_At = new Date(); }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
