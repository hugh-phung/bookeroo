package com.rmit.sept.bk_cartservices.model;

public class CartItemDetails {

    public static final String STATUS_OK = "ok";
    public static final String STATUS_LISTING_NOT_FOUND = "listing_not_found";
    public static final String STATUS_BOOK_NOT_FOUND = "book_not_found";
    public static final String STATUS_LISTING_SOLD = "listing_sold";

    private String status;
    private Long listingId;
    private long bookId;
    private String title;
    private Double price;
    private String seller;
    private String imgURL;
    private Boolean sold;

    public CartItemDetails() { this.status = STATUS_OK; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Long getListingId() { return listingId; }

    public void setListingId(Long listingId) { this.listingId = listingId; }

    public long getBookId() { return bookId; }

    public void setBookId(long bookId) { this.bookId = bookId; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    public String getSeller() { return seller; }

    public void setSeller(String seller) { this.seller = seller; }

    public String getImgURL() { return imgURL; }

    public void setImgURL(String imgURL) { this.imgURL = imgURL; }

    public Boolean getSold() { return sold; }

    public void setSold(Boolean sold) { this.sold = sold; }
}
