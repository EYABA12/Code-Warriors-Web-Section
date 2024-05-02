package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.QuestionRepository;
import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.Service.CatalogueService;
import com.example.besmelhra7menra7im.Service.QuestionService;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.dto.ProduitDto;
import com.example.besmelhra7menra7im.dto.QuestionDto;
import com.example.besmelhra7menra7im.entities.Article;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/")
public class QuestionController {
    @Autowired

    private final QuestionService questionService;
    private final UserService userService;
    private final CatalogueService catalogueService;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuestionController(QuestionService questionService, QuestionRepository questionRepository, CatalogueService catalogueService, UserService userService, UserRepository userRepository) {
        this.questionService = questionService;
        this.catalogueService = catalogueService;
        this.questionRepository = questionRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    //1-postquestion
    @PostMapping("/questions")
    public QuestionDto AddQuestion(@RequestBody QuestionDto questionDto) {
        Question ques = new Question();
        User user = this.userService.getUser(questionDto.idUser);
        Categorie categorie = this.catalogueService.TrouveCatalogueById(questionDto.idCatalogue);
        ques.setCategorie(categorie);
        ques.setUser(user);
ques.setFile(questionDto.file);
        System.out.println("voila categorie" + categorie);
        ques.setQuestion(questionDto.question);
        questionService.AddQuestion(ques);
        return questionDto;

    }

    //1-getAllquestions
    @GetMapping("/questions")
    public List<QuestionDto> getAllQuestions() {
        List<Question> questions = questionService.getAllquestions();
        // Mapper les articles en DTOs
        List<QuestionDto> questionDtos = questions.stream()
                .map(QuestionDto::new)
                .collect(Collectors.toList());
        // Ce code prend une liste d'objets Produit.
        //Il transforme chaque objet Produit en un objet ProduitDto.
        //  Pour réaliser cette transformation, il utilise une méthode appelée référence de constructeur (ProduitDto::new).
        //  Ensuite, il collecte ces objets transformés dans une liste.
        //  Enfin, il renvoie la liste des objets ProduitDto.
        return questionDtos;
    }

    //2-getmethode:idquestion---->son question
    @GetMapping("/questions/{id}")
    public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);

        // Vérifier si la question existe
        if (question == null) {
            return ResponseEntity.notFound().build(); // Retourner une réponse 404 si la question n'est pas trouvée
        }

        // Mapper l'objet Question à un objet QuestionDto
        QuestionDto questionDto = new QuestionDto(question);

        return ResponseEntity.ok(questionDto); // Retourner la questionDto si elle existe
    }

    // 3-getQuestionsByIdcatalogue
    @GetMapping("/questions/catalogue")
    public List<QuestionDto> getQuestionByIdCatalogue(@RequestParam Long idcatalogue) {
        List<Question> questions = questionService.getQuestionsByIdcatalogue(idcatalogue);
        List<QuestionDto> questionDtos = questions.stream()
                .map(QuestionDto::new)
                .collect(Collectors.toList());
        return questionDtos;

    }

    // 4-getQuestionsByIdUser
    @GetMapping("/questions/user")
    public List<QuestionDto> getQuestionByIdUser(@RequestParam Long id) {
        List<Question> questions = questionService.getQuestionsByIduser(id);
        List<QuestionDto> questionDtos = questions.stream()
                .map(QuestionDto::new)
                .collect(Collectors.toList());
        return questionDtos;

    }


//deletequestionbyid

    @DeleteMapping("questions/{id}")
    public void deleteProduit(@PathVariable("id") long id) {
        questionService.deletequestion(id);
    }



}
