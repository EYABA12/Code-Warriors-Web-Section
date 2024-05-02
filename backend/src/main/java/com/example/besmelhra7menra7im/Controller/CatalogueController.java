package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.CatalogueRepository;
import com.example.besmelhra7menra7im.Service.CatalogueService;
import com.example.besmelhra7menra7im.dto.CatalogueDto;
import com.example.besmelhra7menra7im.dto.ProduitDto;
import com.example.besmelhra7menra7im.dto.QuestionDto;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.events.Event;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(path = "/api")
public class CatalogueController {
    private final CatalogueService catalogueService;

    @Autowired
    public CatalogueController(CatalogueService catalogueService) {
        this.catalogueService = catalogueService;
    }
    @PostMapping("/catalogues")
    public CatalogueDto addCatalogue(@Valid @RequestBody CatalogueDto catalogueDto) {

        Categorie catalogueToAdd = new Categorie();
        catalogueToAdd.setNomCatalogue(catalogueDto.nomCatalogue);

        Categorie savedCatalogue = catalogueService.addCatalogue(catalogueToAdd);
        catalogueDto.id = savedCatalogue.getIdCatalogue();

        return catalogueDto;
    }
    @GetMapping("/catalogues")
    public List<CatalogueDto> getAllCategories(){
        return catalogueService.getAllCateg();
    }


    @GetMapping("/catalogues/{id}")
    public CatalogueDto getCataloguById(@PathVariable  Long id) {
        Categorie categorie = catalogueService.findCataloguesById(id);
        // Mapper l'objet Question à un objet QuestionDto

        CatalogueDto catalogueDto = new CatalogueDto(categorie);

        return catalogueDto;

    }


    @DeleteMapping("catalogue/{id}")
    public void deleteProduit(@PathVariable("id") long id) {
        catalogueService.deletecatalogue(id);
    }

}
