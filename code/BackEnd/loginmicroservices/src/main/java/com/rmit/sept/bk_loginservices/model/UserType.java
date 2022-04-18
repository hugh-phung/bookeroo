package com.rmit.sept.bk_loginservices.model;

import java.util.Arrays;
import java.util.List;

public class UserType {
    public static final String ADMIN = "admin";
    public static final String USER = "user";
    public static final String BUSINESS = "business";

    public static final List<String> USERTYPES = Arrays.asList(ADMIN, USER, BUSINESS);
}