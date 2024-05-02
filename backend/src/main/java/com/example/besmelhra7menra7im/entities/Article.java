package com.example.besmelhra7menra7im.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String titre;
    @Column(length = 2000) // Augmentez la taille du champ text à 1000 (ou à la taille souhaitée)
    public String description;
    @Column(length = 2000) // Augmentez la taille du champ text à 1000 (ou à la taille souhaitée)

    public String full_description;
    public Date startDate;
    public String videoUrl;

    @JsonIgnore // Ignorer la sérialisation de cette propriété pour éviter la récursion infinie

    @ManyToOne // Annotation indiquant une relation "plusieurs-à-un" avec une autre entité
    @JoinColumn(name = "categorie_id", nullable = false)
    // Spécifie la colonne de clé étrangère dans la table "Question" pour lier les questions à un utilisateur
// "utilisateur_id" est le nom de la colonne de clé étrangère dans la table "Question" qui fait référence à la clé primaire de la table "User"
// nullable = false indique que la colonne "utilisateur_id" ne peut pas avoir de valeur nulle, c'est-à-dire qu'une question doit être associée à un utilisateur
    private Categorie categorie2; // Référence à l'utilisateur auquel appartient cette question



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getFull_Description() {
        return full_description;
    }

    public void setFull_Description(String full_Description) {
        this.full_description = full_Description;
    }


    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }


    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }


    public Categorie getCategorie2() {
        return categorie2;
    }

    public void setCategorie2(Categorie categorie2) {
        this.categorie2 = categorie2;
    }


    public Long getIdCatalogue() {
        return  (categorie2.getIdCatalogue());

    }





}
