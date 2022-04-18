package com.rmit.sept.testfileuploadservice.web;


import com.rmit.sept.testfileuploadservice.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;


    @PutMapping("/{bookId}")
    public ResponseEntity<?> addBook(@RequestParam(value = "file", required = false) MultipartFile file, @PathVariable String bookId) {

        if (file == null) {
            return new ResponseEntity<String>("Error uploading file. (no file received)", HttpStatus.BAD_REQUEST);
        }

        boolean success = uploadService.saveFile(file, bookId);
        if (!success) {
            return new ResponseEntity<String>("Error saving file.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return  new ResponseEntity<String>("Saved successfully", HttpStatus.CREATED);
    }

}
