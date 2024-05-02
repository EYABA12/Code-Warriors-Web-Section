package com.example.besmelhra7menra7im.dto;

import com.example.besmelhra7menra7im.entities.Article;

import java.util.Date;

public class ProduitDto {
    public long id;
public String  full_description;
public String image;
public String videoUrl;
public Date startDate=new Date();
    public String description;
public String titre;
    public Long idCatalogue;
    public ProduitDto() {
        // Vous pouvez initialiser les champs si nécessaire
    }

    public ProduitDto(Article article) {
        this.id = article.getId();
        this.full_description = article.getFull_Description();
        this.image = article.getImage();
        this.videoUrl = article.getVideoUrl();
        this.startDate = article.getStartDate();
        this.description = article.getDescription();
        this.titre = article.getTitre();
        this.idCatalogue = article.getIdCatalogue();
    }

}
