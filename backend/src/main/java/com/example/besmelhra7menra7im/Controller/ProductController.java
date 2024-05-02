package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.CatalogueRepository;
import com.example.besmelhra7menra7im.Service.CatalogueService;
import com.example.besmelhra7menra7im.Service.ProductService;
import com.example.besmelhra7menra7im.dto.ProduitDto;
import com.example.besmelhra7menra7im.dto.QuestionDto;
import com.example.besmelhra7menra7im.entities.Article;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
public class ProductController {
    private final ProductService productService;
    private final CatalogueService catalogueService;


    public ProductController(ProductService productService, CatalogueService catalogueService) {
        this.productService = productService;
        this.catalogueService = catalogueService;
    }
//getAllArticles
                @GetMapping("/articles")
                public List<ProduitDto> getAllArticles() {
                    List<Article> articles = productService.getAllArticls();

                    // Mapper les articles en DTOs
                    List<ProduitDto> articleDtos = articles.stream()
                            .map(ProduitDto::new)
                            .collect(Collectors.toList());
                    // Ce code prend une liste d'objets Produit.
                    //Il transforme chaque objet Produit en un objet ProduitDto.
                    //  Pour réaliser cette transformation, il utilise une méthode appelée référence de constructeur (ProduitDto::new).
                    //  Ensuite, il collecte ces objets transformés dans une liste.
                    //  Enfin, il renvoie la liste des objets ProduitDto.

                    return articleDtos;
                }
//getArticleByCategorie
@GetMapping("/articles/catalogue")
public List<ProduitDto> getArticlesByIdCatalogue(@RequestParam Long idcatalogue){
        List<Article> articles =productService.getArticlesByIdCatalogue(idcatalogue);
        List<ProduitDto> articlesDto=articles.stream()
                .map(ProduitDto::new)
                .collect(Collectors.toList());
    return articlesDto;
}











    @PostMapping("/articles")
    public ProduitDto addProduit(@Valid @RequestBody ProduitDto produitDto) {

        Article article = new Article();
        article.setDescription(produitDto.description);
        article.setFull_Description(produitDto.full_description);
        article.setStartDate(produitDto.startDate);
        article.setVideoUrl(produitDto.videoUrl);
        article.setTitre(produitDto.titre);
        article.setImage(produitDto.image);

        Categorie categorie = this.catalogueService.findCataloguesById(produitDto.idCatalogue);
        // Vérifier si la catégorie existe
        if (categorie != null) {
            article.setCategorie2(categorie);
            // Ajouter l'article via le service
            productService.addProduit(article);
        } else {
            // Gérer le cas où la catégorie n'existe pas
            // Vous pouvez lever une exception, enregistrer un message d'erreur, ou effectuer toute autre action nécessaire
            throw new RuntimeException("La catégorie spécifiée n'existe pas.");
        }
        article.setCategorie2(categorie);
        productService.addProduit(article);
        return produitDto;
    }

    @DeleteMapping("articles/{id}")
       public ResponseEntity<String> deleteArticle(@PathVariable("id") long id) {
           productService.deleteProduit(id);
           return ResponseEntity.ok("Article deleted successfully");  }



    @PutMapping("produit/{id}")
    public void updateProduit(@PathVariable("id") Long id, @RequestBody Article produit) {
        productService.updateProduit(id, produit);
    }

    @GetMapping("articles/{id}")
    public Article getStudentsByID(@PathVariable("id") Long id) {

        return productService.getProduitByid(id);
    }


}
