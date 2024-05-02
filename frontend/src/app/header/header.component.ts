import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Categorie } from '../../model/Categories.model';
import { QuestionDto } from '../../model/QuestionDto.models';
import { ArticlesDto } from '../../model/ArticlesDto.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  AfficheCard=false;
  Categorie:Categorie[] = [];
  questions:QuestionDto[] = [];
  articlesDto:ArticlesDto[]=[];

  isLoggedIn: boolean = false;
  userProfile: any = {
    image: '',
    userName:'',
    firstName: '',
    confirmPassword: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    place: ''
  };

  constructor(private auth: LoginService) { }

  ngOnInit(): void {
   
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.getUserProfileFromDatabase(); // Appeler la méthode pour récupérer le profil de l'utilisateur au chargement du composant
  this.getAllCategories();
  }



  
getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
  }

  

  getUserProfileFromDatabase() {
    const userId = localStorage.getItem('clientId');
    console.log(userId); // undefined
    if (userId !== null && userId !== undefined && userId !== 'undefined') {
        console.log(userId !== null && userId !== undefined)
        this.auth.getUserById(userId).subscribe(
            user => {
                this.userProfile = user;
                console.log(this.userProfile)
                if (!this.userProfile.image) {
                    this.userProfile.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
                }
            },
            error => {
                console.log("Erreur lors de la récupération des détails de l'utilisateur :", error);
            }
        );
    } else {
        console.error('User ID not found in local storage');
        this.auth.signOut();
    }
}
  show(){
    this.AfficheCard=true;
  }
  logout() {
    this.auth.signOut();
  }
  close(){
    this.AfficheCard=false;
  }
}