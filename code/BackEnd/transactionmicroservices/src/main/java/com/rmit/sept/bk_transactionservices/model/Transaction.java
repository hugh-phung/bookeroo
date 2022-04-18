package com.rmit.sept.bk_transactionservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.util.Date;


@Entity
public class Transaction {

    public static final String STATUS_SHIPPED = "shipped";
    public static final String STATUS_REFUNDED = "refunded";
    public static final String STATUS_CONFIRMED = "confirmed";
    public static final String STATUS_CANCELLABLE = "cancellable";
    public static final String STATUS_CANCELLED = "cancelled";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "listingId is required")
    @Positive(message = "listingId must be positive")
    private Long listingId;
    @NotBlank(message = "buyer is required")
    private String buyer;
    @NotBlank(message = "seller is required")
    private String seller;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date date;
    @NotBlank(message = "status is required")
    @Pattern(regexp = "(shipped)|(refunded)|(confirmed)|(cancellable)|(cancelled)", message = "type must be 'shipped', 'refunded', 'confirmed', 'cancellable', or 'cancelled'")
    private String status;

    private Date create_At;
    private Date update_At;

    public Transaction() { }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getListingId() { return listingId; }

    public void setListingId(Long listingId) { this.listingId = listingId; }

    public String getBuyer() { return buyer; }

    public void setBuyer(String buyer) { this.buyer = buyer; }

    public String getSeller() { return seller; }

    public void setSeller(String seller) { this.seller = seller; }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    @PrePersist
    protected void onCreate() { this.create_At = new Date(); }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}