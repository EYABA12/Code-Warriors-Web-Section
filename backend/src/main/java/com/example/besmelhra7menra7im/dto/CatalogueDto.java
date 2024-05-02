package com.example.besmelhra7menra7im.dto;


import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CatalogueDto {
    public Long id;

    public String nomCatalogue;

    public CatalogueDto() {
    }

    public CatalogueDto(Categorie categorie) {
        this.id = categorie.getIdCatalogue();
        this.nomCatalogue = categorie.getNomCatalogue();


    }
}