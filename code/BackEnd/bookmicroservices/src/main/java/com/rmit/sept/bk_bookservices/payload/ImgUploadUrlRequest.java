package com.rmit.sept.bk_bookservices.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

public class ImgUploadUrlRequest {

    @NotNull(message = "ID is required")
    @Positive(message = "ID invalid")
    private Long bookId;
    @NotBlank(message = "contentType cannot be blank")
    @Pattern(regexp = "image/.*", message = "File must be an image")
    private String contentType;

    public Long getBookId() { return bookId; }

    public void setBookId(Long bookId) { this.bookId = bookId; }

    public String getContentType() { return contentType; }

    public void setContentType(String contentType) { this.contentType = contentType; }
}