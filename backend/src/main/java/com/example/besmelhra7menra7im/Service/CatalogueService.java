package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.CatalogueRepository;
import com.example.besmelhra7menra7im.dto.CatalogueDto;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class CatalogueService {


    private final CatalogueRepository catalogueRepository;

    @Autowired
    public CatalogueService(CatalogueRepository catalogueRepository) {
        this.catalogueRepository = catalogueRepository;
    }
    public Categorie addCatalogue(Categorie catalogue){

        return catalogueRepository.save(catalogue);
    }

    //1-findCatalogueByid
            public Categorie TrouveCatalogueById(Long id){
                Optional<Categorie> categorieOptional = catalogueRepository.findById(id);

                return categorieOptional.orElse(null);
            }


    //2-findCatalogueById
    public Categorie findCataloguesById(Long id) {
        Optional<Categorie> optionalQuestion = catalogueRepository.findById(id);
        return optionalQuestion.orElse(null);


    }


    public List<CatalogueDto>getAllCateg(){
        List<CatalogueDto> cataloguesDto=new ArrayList<>();
        List<Categorie> categories =catalogueRepository.findAll();
        for (Categorie categorie : categories) {
            CatalogueDto catalogueDto = new CatalogueDto();
            catalogueDto.id=(categorie.getIdCatalogue());
            catalogueDto.nomCatalogue=(categorie.getNomCatalogue());
            cataloguesDto.add(catalogueDto);
        }

        return cataloguesDto;
    }



    public void deletecatalogue(Long id) {
        boolean exist = catalogueRepository.existsById(id);

        if (exist) {
            catalogueRepository.deleteById(id);
        } else {
            throw new IllegalStateException(
                    "catalogue with id " + id + " does not exist "
            );
        }
    }



    // REST (Representational state transfer)

    // 2XX -> etat ok opération effectué avec succés
    // 4XX -> erreur utilisateur
    // 5XX -> erreur serveur (à éviter)


    // utilisateur  -->  Resouurce
    // création utilisatuer => POST /users  && body -> utilisateur à créer  --Retour--> 201 Created && idUser || 400 Bad Request en cas d'erreur
    // retrouver un utilisateur => GET /users/{idUser}  ->  --Retour--> 200 Ok & l'objet User || 404 Not found
    // récupérer un ensemble d'utilisateurs => GET /users?age=20&name=Mohamed (QueryParam) => 200 ok tableau json (si aucune ressource ne respecte les conditions => 200 ok avec tableau vide)
    // modifier certaines info de l'utilisateur => PATCH /users/{idUser} & body contenant un json des propriétés à modifier => 204 No Content
    //
}

