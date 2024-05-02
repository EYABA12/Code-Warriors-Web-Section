package com.example.besmelhra7menra7im.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long idCatalogue;

    public String nomCatalogue;
    public Long getIdCatalogue() {
        return idCatalogue;
    }

    public void setIdCatalogue(Long idcatalogue) {
        this.idCatalogue = idcatalogue;
    }



    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL)
// mappedBy = "user": La relation est définie dans l'entité "Question" avec la propriété "user"
// Cela signifie que l'entité "Question" contient une propriété "user" qui fait référence à l'utilisateur associé

// cascade = CascadeType.ALL: Spécifie que toutes les opérations effectuées sur l'utilisateur seront propagées aux questions associées
// Par exemple, si un utilisateur est supprimé, toutes les questions associées à cet utilisateur seront également supprimées
    private List<Question> questions; // Liste des questions associées à cet utilisateur


    public List<Article> getArticle() {
        return article;
    }

    public void setArticle(List<Article> article) {
        this.article = article;
    }

    @OneToMany(mappedBy = "categorie2", fetch = FetchType.EAGER)
    private List<Article> article = new ArrayList<>();



    public String getNomCatalogue() {
        return nomCatalogue;
    }

    public void setNomCatalogue(String nomCatalogue) {
        this.nomCatalogue = nomCatalogue;
    }



}
