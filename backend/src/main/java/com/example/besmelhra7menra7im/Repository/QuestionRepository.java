package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Police;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<Question, Long> {
    // Méthode pour récupérer toutes les questions associées à un catalogue par son ID
    List<Question> findByCategorieIdCatalogue(Long idCatalogue);
    // Méthode pour récupérer toutes les questions posées par un utilisateur spécifique
    List<Question> findByUserId(Long id);

}