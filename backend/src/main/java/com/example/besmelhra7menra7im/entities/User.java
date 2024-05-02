package com.example.besmelhra7menra7im.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lastName;
    private String place;
    private String phoneNumber;



    private String work;
    private String club;




    private String  university;
    private String email;
    private String role; // New field for role

    private String password;
    @Lob
    private String image;
    private String emailSubscription;
    private String userName;
    // Constructor to set default role
    public User() {
        this.role = "client"; // Default role is set to "client"
    }


    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Message> receivers= new ArrayList<>();
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Message> senders= new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Question> questions= new ArrayList<>();



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Answer> answers= new ArrayList<>();

    public List<Question> getQuestions() {
        return questions;
    }







    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
    public Long getId() {
        return id;
    }
    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }
    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailSubscription() {
        return emailSubscription;
    }

    public void setEmailSubscription(String emailSubscription) {
        this.emailSubscription = emailSubscription;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }



    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    private String confirmPassword;
    private Date registrationDate = new Date(); // Date d'enregistrement par défaut

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    private String firstName;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }}