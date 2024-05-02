import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Categorie } from '../../model/Categories.model';
import {  QuestionDto } from '../../model/QuestionDto.models';
import { User } from '../../model/User.model';
import axios from 'axios';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  image2: string | undefined;

  image: string | null = null;
  Categorie:Categorie[] = [];
  selectedCategoryId: number=0// Définition de la propriété pour stocker l'ID sélectionné
  idUser: number = 0; // Déclaration de idUser
  

  users:User[]=[]

  fileSelected: boolean = false;
  // Nom du fichier sélectionné
  fileName: string = '';

  submitDisabled = false;

  


  //ccreation objet questionDtp
questionDto: QuestionDto = {
      id: 0,
      question:'',
      idUser:0,
      idCatalogue: this.selectedCategoryId,// Utilisez selectedCategoryId pour idCatalogue
      file:''
    };

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
constructor( private auth: LoginService) { } 
ngOnInit(): void {
  const clientIdString = localStorage.getItem("clientId");
  if (clientIdString) {
    // Utilisez parseInt pour convertir la chaîne en nombre
    this.idUser = parseInt(clientIdString, 10);
    this.userConnect.id=parseInt(clientIdString, 10);
  }this.getAllCategories()
  this.getUserByid();

}




async handleFile(event: any) {
  this.submitDisabled = true;
  const file = event.target.files[0];
  console.log("file is ",file)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'eyabenamor'); // Remplacez 'your_upload_preset_name' par votre upload preset
  const cloudName = 'dxcoxu3bn'; // Remplacez 'your_cloud_name' par votre nom de compte Cloudinary

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    this.questionDto.file= res.data.secure_url;
    this.submitDisabled = false
    console.log("note fichier estt hh",this.questionDto.file);
  } catch (err) {
    console.error(err);
  }
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
        console.log("notre image",this.userConnect.image)
      } else {
        console.error("L'utilisateur est null.");
      }
    },
    error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  );
  }  


//1-obtient tout les categorie dans une liste 
getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
}
onSubmit(): void {
  console.log("our selected category id", this.selectedCategoryId);
  if (this.selectedCategoryId !== null && this.selectedCategoryId !== 0) {
    this.questionDto.idCatalogue = this.selectedCategoryId;
    this.questionDto.idUser = this.idUser; // Also make sure to assign idUser
      console.log("our image 2 is", this.questionDto.file);
      this.auth.createQuestion(this.questionDto).subscribe(
        response => {
          console.log('question created successfully:', response);
          alert("The question has been posted.");
         this. questionDto = {
            id: 0,
            question:'',
            idUser:0,
            idCatalogue: this.selectedCategoryId,// Utilisez selectedCategoryId pour idCatalogue
            file:''
          };
        },
        error => {
          console.error('Error creating the question:', error);
        }
      );
    
  }
}



}