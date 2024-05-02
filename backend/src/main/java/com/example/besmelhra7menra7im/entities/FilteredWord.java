package com.example.besmelhra7menra7im.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FilteredWord {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    private String word;

    // Constructeurs, getters et setters
}