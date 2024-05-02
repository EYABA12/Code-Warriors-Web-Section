package com.example.besmelhra7menra7im.dto;

import com.example.besmelhra7menra7im.entities.Article;
import com.example.besmelhra7menra7im.entities.Question;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class QuestionDto {
    public long id;
    public String question;
    public String file;
    public Long idUser;
public Date dateQuestion;
    public Long  idCatalogue;
    // Constructeur par défaut
    public QuestionDto() {
    }

    public QuestionDto(Question question) {
        this.file= question.getFile();
        this.id = question.getId();
      this.question=question.getQuestion();
      this.idUser=question.getIdUser();
      this.idCatalogue=question.getIdCatalogue();
      this.dateQuestion=question.getRegistrationDate();
    }
}
