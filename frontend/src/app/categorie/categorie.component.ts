import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { ArticlesDto } from '../../model/ArticlesDto.models';
import { QuestionDto } from '../../model/QuestionDto.models';
import { User } from '../../model/User.model';
import { Categorie } from '../../model/Categories.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {
categorieId=0;
articlesDto:ArticlesDto[]=[];
questions:QuestionDto[]=[]
  Categorie:Categorie[] = [];
   users: User[] = [];
   combinedData: { questions: any, users: any, ListCatgeorie: any }[] = [];
   ListCatgeorie:Categorie[]=[];

  constructor( private auth: LoginService,private route: ActivatedRoute) { } 
  ngOnInit(): void {

    // Utilisez parseInt pour convertir la chaîne en nombre
    this.getAllQuestions();


    this.route.params.subscribe(params => {
      this.categorieId = +params['categorieId']; // Utilisation de 'IdQuestion' au lieu de 'idQuestion'
     


    });
    console.log("id categorie",this.categorieId)
    
    this.fetchQuestionsAndArticlesByCategoryId(this.categorieId)

  }

    //getTouslesquestionBy categoryId
  fetchQuestionsByCategoryId(categorieId: number): void {
    console.log("notre id danss hfhfhhf",categorieId)

    this.auth.getQuestionsByCatalogueId(categorieId)
        .subscribe(questionList => {
          this.questions = questionList;
          console.log(this.questions)
        },
        error => {
          // Gérer les erreurs
          console.error('Une erreur s\'est produite : ', error);
        }
      );
  }
  
//getTouslesarticles by categoryId
fetchArticlesByCategoryId(categorieId: number): void {
  this.auth.getArticlesByCataloguesId(categorieId)
      .subscribe(articlesList => {
        this.articlesDto = articlesList;
        console.log(articlesList)
      },
      error => {
        // Gérer les erreurs
        console.error('Une erreur s\'est produite : ', error);
      }
    );
}





fetchQuestionsAndArticlesByCategoryId(categorieId: number): void {
  this.fetchQuestionsByCategoryId(categorieId);
  this.fetchArticlesByCategoryId(categorieId);
}




getAllQuestions(): void {
  // Ici, vous récupérez vos questions, puis pour chaque question, vous récupérez les détails de l'utilisateur

  // Récupérer toutes les questions
  this.auth.getAllQuestions().subscribe(
    questionList => {
        this.questions = questionList;

        // Pour chaque question, récupérer les détails de l'utilisateur correspondant
        this.questions.forEach(question => {
            // Récupérer l'utilisateur associé à la question
            this.auth.getUserById(question.idUser).subscribe(
                user => {
                    // Ajouter l'utilisateur à la liste
                    this.users.push(user);
                    if (!user.image) {
                      user.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
                  }
                },
                error => {
                    console.log("Erreur lors de la récupération des détails de l'utilisateur :", error);
                }
            );

            // Récupérer la catégorie associée à la question
            this.auth.getCatlogueByid(question.idCatalogue).subscribe(
                categorie => {
                    // Ajouter la catégorie à la liste
                    this.ListCatgeorie.push(categorie);
                },
                error => {
                    console.log("Erreur lors de la récupération des détails de la catégorie :", error);
                }
            );
        });
    },
    error => {
        console.log("Erreur lors de la récupération des questions :", error);
    }
);


}





}


