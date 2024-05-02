package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.CatalogueRepository;
import com.example.besmelhra7menra7im.Repository.ProduitRepository;
import com.example.besmelhra7menra7im.entities.Article;
;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {


    private final ProduitRepository produitRepository;
    @Autowired
    private CatalogueRepository catalogueRepository;

    @Autowired
    public ProductService(ProduitRepository produitRepository, CatalogueRepository catalogueRepository) {
        this.produitRepository = produitRepository;
        this.catalogueRepository = catalogueRepository;
    }


    public List<Article> findProduitByIds(List<Long> ids) {
        List<Article> result = new ArrayList<>();

        for (Long id : ids) {
            Optional<Article> c = this.produitRepository.findById(id);
            c.ifPresent(result::add);
        }

        return result;
    }

    public Article getProduitByNomProduit(String nomProduit) {
        List<Article> produits = produitRepository.findByTitre(nomProduit);
        if (!produits.isEmpty()) {
            return produits.get(0);  // Retournez le premier produit de la liste
        } else {
            return null;  // Ajustez cela en fonction de votre logique commerciale
        }
    }

    public List<Article> getAllArticls() {
        return produitRepository.findAll();
    }

    public Article addProduit(Article produit) {

        return produitRepository.save(produit);
    }


    public void deleteProduit(Long id) {
        boolean exist = produitRepository.existsById(id);

        if (exist) {
            produitRepository.deleteById(id);
        } else {
            System.out.println("Produit numexiste  pas");
        }
        ;
    }


    //1-getArticlesBycatalogue
    public List<Article> getArticlesByIdCatalogue(Long idCatalogue ){
        List<Article> articles = produitRepository.findByCategorie2IdCatalogue(idCatalogue);
        return articles;}



    public void updateProduit(Long id, Article produit) {
        boolean exist = produitRepository.existsById(id);
        if (exist) {
            produitRepository.save(produit);

        } else {
            System.out.println("produit num " + id + "n'existpas");
        }
    }

    public Article getProduitByid(Long id) {
        Optional<Article> optionalProduit = produitRepository.findById(id);

        if (optionalProduit.isPresent()) {
            return optionalProduit.get();
        } else {
            throw new NoSuchElementException("Produit avec l'ID " + id + " n'existe pas");
        }
    }

    /*public List<Article> getArticlesByCategory(String categorie) {
        List<Article> result = new ArrayList<>();
        List<Article> articles = getAllArticls();

        // Parcourir tous les articles
        for (Article article : articles) {
            // Vérifier si la liste des noms de catalogues de l'article contient la catégorie spécifiée
            if (article.getCatalogueNames().contains(categorie)) {
                // Ajouter l'article à la liste des résultats
                result.add(article);
            }
        }
        return result;
    }*/
}



