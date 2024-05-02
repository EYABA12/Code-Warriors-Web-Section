import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { QuestionDto } from '../../model/QuestionDto.models';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/User.model';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrl: './profil-user.component.css'
})
export class ProfilUserComponent {
  questions:QuestionDto[] = [];
  userId:number=0;
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
  constructor( private auth: LoginService,private route :ActivatedRoute) { } 
  ngOnInit(): void {
this.route.params.subscribe(params=>{
  this.userId=+params['idUser'];
}
  )

    this.getQuestionsByUserId()
    this.getUserByid()


}


getUserByid(): void {
  this.auth.getUserById(this.userId).subscribe(
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


//getTouslesquestionBy categoryId
fetchQuestionsByCategoryId(CategoryId: number): void {
  this.auth.getQuestionsByCatalogueId(CategoryId)
      .subscribe(questionList => {
        this.questions = questionList;
        console.log(questionList)
      },
      error => {
        // Gérer les erreurs
        console.error('Une erreur s\'est produite : ', error);
      }
    );


}


//get les question d'un utilisateur 
getQuestionsByUserId():void{
  if (this.userId !== null) {
    this.auth.getQuestionsByUserId(this.userId).subscribe(questionList => {
      this.questions = questionList;
      console.log(questionList)
    },
    error => {
      // Gérer les erreurs
      console.error('Une erreur s\'est produite : ', error);
    }

    );
}}}
