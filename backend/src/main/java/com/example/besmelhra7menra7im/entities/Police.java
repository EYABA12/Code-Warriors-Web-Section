package com.example.besmelhra7menra7im.entities;

import jakarta.persistence.*;

@Entity
public class Police {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 2000) // Augmentez la taille du champ text à 1000 (ou à la taille souhaitée)

    private String text;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
