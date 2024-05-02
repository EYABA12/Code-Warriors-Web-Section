import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup } from '@angular/forms';
import { Conditional } from '@angular/compiler';
import { User } from '../../model/User.model';
import axios from 'axios';

@Component({
  selector: 'app-info-setting',
  templateUrl: './info-setting.component.html',
  styleUrl: './info-setting.component.css'
})
export class InfoSettingComponent {
  image2: string | undefined;
  public userFile:any=File
  userProfile: User = {
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

  
  constructor(private auth: LoginService) { }

  ngOnInit(): void { 
    this.getUserProfileFromDatabase();
  }



  async handleFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'eyabenamor'); // Remplacez 'your_upload_preset_name' par votre upload preset
    const cloudName = 'dxcoxu3bn'; // Remplacez 'your_cloud_name' par votre nom de compte Cloudinary

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      this.image2 = res.data.secure_url;
      console.log(this.image2);
    } catch (err) {
      console.error(err);
    }
  }


  updateProfile() {
    const id = localStorage.getItem('clientId');
    const userProfileData = {
      id: id,
      firstName: this.userProfile.firstName,
      userName:this.userProfile.userName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      phoneNumber: this.userProfile.phoneNumber,
      password: this.userProfile.password,
      confirmPassword: this.userProfile.confirmPassword,
      place: this.userProfile.place,
      image: this.image2 ,// Utilisez le nom de clé correct
      university:this.userProfile.university,
      work:this.userProfile.work

    };
  
    console.log("voici nos données", userProfileData);
  
    this.auth.updateProfile(userProfileData)
      .subscribe({
        next: (response) => {
          console.log("notre image", userProfileData.image);
          console.log("notre prénom", userProfileData.firstName);
  
          alert("Profile updated successfully"); // Affiche un message d'alerte avec le message de succès de la réponse
        },
        error: (error) => {
          console.log('Erreur lors de la mise à jour du profil', error);
        }
      });
  }
  updateAndRefreshProfile() {
    this.updateProfile();
    this.getUserProfileFromDatabase();
  }
  
  getUserProfileFromDatabase() {
    const userId = localStorage.getItem('clientId'); // Récupérer l'ID de l'utilisateur depuis le stockage local
    if (userId !== null) {

    this.auth.getUpdatedUser(userId) // Utilisez userId au lieu de this.userProfile
      .subscribe(
        (response) => {
          // Mettre à jour userProfile avec les informations récupérées
          this.userProfile.firstName=response.firstName
          this.userProfile.lastName=response.lastName
          this.userProfile.userName=response.userName
          this.userProfile.email=response.email
          this.userProfile.confirmPassword=response.confirmPassword
          this.userProfile.phoneNumber=response.phoneNumber
          this.userProfile.password=response.password
          this.userProfile.image=response.image
this.userProfile.work=response.work
this.userFile.university=response.university
          console.log("retrieved image from server: " + JSON.stringify(this.userProfile))
        },
        (error) => {
          console.log('Error retrieving user profile', error);
        }
      );
  }
  else {
    console.error('User ID not found in local storage');
  }
}
  
  
}
