package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Answer;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository  extends JpaRepository<Answer, Long> {

    // Méthode pour récupérer toutes les reponse associées à un question par son ID
    List<Answer> findByQuestionId(Long id);
    // Méthode pour récupérer toutes les questions posées par un utilisateur spécifique
    List<Answer> findByUserId(Long id);
}
