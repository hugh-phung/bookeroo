package com.rmit.sept.bk_cartservices.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;


@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "(\\d{10})|(\\d{13})", message = "Please enter a valid ISBN")
    private String isbn;
    @NotBlank(message = "Please enter a book title")
    private String title;
    @NotBlank(message = "Author is required")
    private String author;
    @NotBlank(message = "Genre is required")
    private String genre;
//    private String tableOfContents;
    @NotBlank(message = "Image URL is required")
    private String imgURL;
    @NotBlank(message = "Description is required")
    private String description;
    private Date create_At;
    private Date update_At;

    //OneToMany with Project

    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() { return isbn; }

    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }

    public void setAuthor(String author) { this.author = author; }

    public String getGenre() { return genre; }

    public void setGenre(String genre) { this.genre = genre; }

    public String getImgURL() { return imgURL; }

    public void setImgURL(String imgURL) { this.imgURL = imgURL; }

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

//    public String getTableOfContents() { return tableOfContents; }
//
//    public void setTableOfContents(String tableOfContents) { this.tableOfContents = tableOfContents; }

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