package com.rmit.sept.bk_transactionservices.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.util.Date;


@Entity
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "bookId is required")
    @Positive(message = "bookId must be positive")
    private Long bookId;
    @NotBlank(message = "seller is required")
    private String seller;
    @NotBlank(message = "type is required")
    @Pattern(regexp = "(new)|(used)", message = "type must be 'new' or 'used'")
    private String type;
    @NotNull(message = "price is required")
    @Positive(message = "price must be positive")
    private Double price;
    private Boolean sold;

    private Date create_At;
    private Date update_At;

    public Listing() { }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getBookId() { return bookId; }

    public void setBookId(Long bookId) { this.bookId = bookId; }

    public String getSeller() { return seller; }

    public void setSeller(String seller) { this.seller = seller; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    public Boolean getSold() { return sold; }

    public void setSold(Boolean sold) { this.sold = sold; }

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
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}