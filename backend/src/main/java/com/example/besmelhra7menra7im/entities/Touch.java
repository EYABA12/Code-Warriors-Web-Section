package com.example.besmelhra7menra7im.entities;
import jakarta.persistence.*;
@Entity
public class Touch {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String email;
    private String message;

    // Constructeurs, getters et setters

    public Touch() {
    }

    public Touch(String question, String email, String message) {
        this.question = question;
        this.email = email;
        this.message = message;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // toString, equals et hashCode si nécessaire

}
