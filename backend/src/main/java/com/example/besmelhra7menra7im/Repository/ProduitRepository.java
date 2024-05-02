package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Article;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface ProduitRepository extends JpaRepository<Article, Long> {
    List<Article> findByTitre(String titre);
    List<Article> findByCategorie2IdCatalogue(Long idCatalogue);



}
