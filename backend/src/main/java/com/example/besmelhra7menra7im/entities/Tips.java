package com.example.besmelhra7menra7im.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tips {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Long interestRate) {
        this.interestRate = interestRate;
    }

    private Long   interestRate; // Ajout de la propriété interestRate

    private String title;
    private String description;

    // Constructeurs, getters et setters

    public Tips() {
    }

    public Tips(String title, String description, Long interestRate) {
        this.title = title;
        this.description = description;
        this.interestRate=interestRate;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}