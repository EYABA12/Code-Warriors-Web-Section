package com.example.besmelhra7menra7im.dto;

import com.example.besmelhra7menra7im.entities.Answer;
import com.example.besmelhra7menra7im.entities.Question;

import java.util.Date;

public class AnswerDto {
    public long id;
    public Long idUser;
    public String answer;
    public Date dateAnswer=new Date();
    public Long  idQuestion;
    // Constructeur par défaut
    public AnswerDto() {
    }

    public AnswerDto(Answer answer) {
        this.id = answer.getId();
        this.idUser=answer.getIdUser();
        this.answer=answer.getAnswer();
        this.idQuestion=answer.getIdQuestion();
        this.dateAnswer=answer.getDate();
    }



}
