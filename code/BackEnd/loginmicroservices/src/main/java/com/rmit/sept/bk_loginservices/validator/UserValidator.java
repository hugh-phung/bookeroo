package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        User user = (User) object;

        if(user.getPassword().length() <6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }

        if(!user.getPassword().equals(user.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");

        }

        //confirmPassword



        // Check if userType is valid, if true checks if business account and business info (ABN & name) is valid,
        // otherwise ensures business info is empty (non-business account).
        if (!UserType.USERTYPES.contains(user.getUserType())) {
            errors.rejectValue("userType", "Invalid", "Invalid user type");
        }
        else {
            if (user.getUserType().equals(UserType.BUSINESS)) {
                if (!user.getAbn().matches("\\d{11}")) {
//              not sure what second arg is meant to be used for. (errorCode ?)
                    errors.rejectValue("abn", "Format", "Invalid ABN");
                }
                if (user.getBusinessName().trim().isEmpty()) {
//              not sure what second arg is meant to be used for. (errorCode ?)
                    errors.rejectValue("businessName", "Empty", "Business accounts must specify a business name");
                }
            }
            else {
                user.setAbn("");
                user.setBusinessName("");
            }
        }
    }
}
