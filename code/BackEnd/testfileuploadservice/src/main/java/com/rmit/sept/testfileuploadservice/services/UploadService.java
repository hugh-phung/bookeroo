package com.rmit.sept.testfileuploadservice.services;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
public class UploadService {


    public boolean saveFile(MultipartFile file, String bookId){
//        String dir = ".\\src\\main\\resources\\uploads\\";
        String dir = "BackEnd/testfileuploadservice/src/main/resources/uploads/";
        String[] filenameTokens = file.getOriginalFilename().split("\\.");
        String filename = bookId + '.' + filenameTokens[filenameTokens.length - 1];

        try {
            FileOutputStream fos = new FileOutputStream(dir + filename);
            fos.write(file.getBytes());
            fos.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

}
