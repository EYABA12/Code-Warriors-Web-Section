import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Categorie } from '../../model/Categories.model';
import { AnswersDto } from '../../model/AnswersDto.models';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/User.model';
import { QuestionDto } from '../../model/QuestionDto.models';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  Categorie:Categorie[] = [];
  userIdClientConnecte:number=0;
  users:User[]=[]
  questionDto: QuestionDto = {
    id: 0,
    question:'',
    idUser:0,
    idCatalogue: 0,
    file:''
  };
  Answers:AnswersDto[] = [];
  reponseNumber:number=0;
userConnect: User = {
  id:0,
  image:'',
userName: '',
firstName:'',
lastName:'',
phoneNumber:'',
place:'',
email: '',
emailSubscription: '',
password: '',
confirmPassword: '',
registrationDate: '',
university:'',
work:'',

 
};



  questionId: number=0; // Déclaration de la propriété questionId
userId:number=0;
  answerDto: AnswersDto = {
    id: 0,
    answer:'',
    idUser:0,
    idQuestion: 0,// ceci on va prendre de le fait que on appuie sur bouton question 
    dateAnswer:new Date()
  };

  constructor( private auth: LoginService,private route: ActivatedRoute) { } 
  ngOnInit(): void {
    const userIdClientConnecte = localStorage.getItem('clientId');
    this.reponseNumber=this.Answers.length
    this.getQuestionByid()

  if (userIdClientConnecte) {
    // Utilisez parseInt pour convertir la chaîne en nombre
    this.userConnect.id = parseInt(userIdClientConnecte, 10);
  }
    console.log("notre ishhhbbbbbbbbbbb",this.userConnect.id)

    this.route.params.subscribe(params => {
      this.questionId = +params['IdQuestion']; // Utilisation de 'IdQuestion' au lieu de 'idQuestion'
      this.userId = +params['userId']; // Utilisation de 'userId' au lieu de 'idUser'
      this.answerDto.idQuestion = this.questionId; // Affectation de la questionId à idQuestion
      this.answerDto.idUser = this.userConnect.id; // Affectation de userId à idUser
      console.log("notre question", this.answerDto.idQuestion)
      this.fetchAnswerByQuestionId(this.questionId)
      this.getUserByid();
      this.getQuestionByid()
     


    });
  
    this.getAllCategories();
  
    
console.log("notre user id egle",this.userConnect.id)
  
  }

  getUserByid(): void {
    this.auth.getUserById(this.userConnect.id).subscribe(
      user => {
        if (user) {
          this.userConnect = user;
          if (!this.userConnect.image) {
            this.userConnect.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
        }
          console.log("notre user", user);
        } else {
          console.error("L'utilisateur est null.");
        }
      },
      error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    );
    }  
    getQuestionByid(): void {
      console.log(this.answerDto.idQuestion)
      this.auth.getQuestionById(this.answerDto.idQuestion).subscribe(
        question => {
          if (question) {
            this.questionDto = question;
            console.log("voile la questionn 4kgkgk",question)
           
          } else {
            console.error("L'utilisateur est null.");
          }
        },
        error => {
          console.error("Erreur lors de la récupération de l'question :", error);
        }
      );
      }  






  getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
  }


  fetchAnswerByQuestionId(QuestionId: number): void {
    this.auth.getAnswerByIdQuestion(QuestionId)
      .subscribe(AnswerList => {
        this.Answers = AnswerList;
        // Réinitialiser la liste des utilisateurs
        this.users = [];
        // Pour chaque réponse, récupérer les détails de l'utilisateur correspondant
        this.Answers.forEach(answer => {
          // Récupérer l'utilisateur associé à la réponse
          this.auth.getUserById(answer.idUser).subscribe(
            user => {
              // Ajouter l'utilisateur à la liste
              this.users.push(user);
              if (!this.userConnect.image) {
                this.userConnect.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
            }
            },
            error => {
              console.log("Erreur lors de la récupération des détails de l'utilisateur :", error);
            }
          );
        });
        // Mettre à jour le nombre de réponses après avoir récupéré toutes les réponses
        this.reponseNumber = this.Answers.length;
        console.log("Le nombre de réponses est : ", this.reponseNumber);
      },
      error => {
        // Gérer les erreurs
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
  


loadAnswers(): void {
  console.log(this.answerDto.idQuestion)
  console.log("notre id user",this.answerDto.idUser)

  this.auth.createAnswer(this.answerDto).subscribe(
    response => {
      // Afficher un message de succès à l'utilisateur si nécessaire
      console.log('Article créé avec succès:', response);
      alert('Answer created successfully'); 
      this.answerDto = {
        id: 0,
        answer:'',
        idUser:0,
        idQuestion: 0,// ceci on va prendre de le fait que on appuie sur bouton question 
        dateAnswer:new Date()
      };
    

      },
    (error: any) => {
      console.error('Erreur lors du chargement des réponses:', error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  );
}}


