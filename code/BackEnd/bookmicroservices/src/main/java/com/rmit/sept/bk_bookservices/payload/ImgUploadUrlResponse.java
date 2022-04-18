package com.rmit.sept.bk_bookservices.payload;

public class ImgUploadUrlResponse {
    private String url;

    public ImgUploadUrlResponse(String url) {
        this.url = url;
    }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    @Override
    public String toString() {
        return "ImgUploadUrlReponse{" +
                "url='" + url + '\'' +
                '}';
    }
}
