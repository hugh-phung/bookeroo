package com.rmit.sept.bk_listingservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ms_listings {

    public static void main(String[] args) {
        SpringApplication.run(ms_listings.class, args);
    }
}
