package com.example.besmelhra7menra7im.dto;

import com.example.besmelhra7menra7im.entities.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.util.Date;

public class UserDto {
    public Long id;
    public String lastName;
    public String work;
    public String club;




    public String  university;

    public String place;
    public String phoneNumber;
public String firstName;
public String confirmPassword;
    public String email;
    public String password;
    @Lob
    public String image;
    public String emailSubscription;
    public String userName;
public Date date=new Date();

    public UserDto() {
        // Constructeur par défaut
    }
    public UserDto(User user) {
        this.id=user.getId();
        this.club=user.getClub();
        this.university=user.getUniversity();
        this.work=user.getWork();
        this.lastName = user.getLastName();
        this.place = user.getPlace();
        this.phoneNumber = user.getPhoneNumber();
        this.firstName = user.getFirstName();
        this.confirmPassword = user.getConfirmPassword();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.image = user.getImage();
        this.emailSubscription = user.getEmailSubscription();
        this.userName = user.getUserName();
    }
}
