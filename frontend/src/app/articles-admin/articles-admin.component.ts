import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Categorie } from '../../model/Categories.model';
import { ArticlesDto } from '../../model/ArticlesDto.models';
import axios from 'axios';

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrl: './articles-admin.component.css'
})
export class ArticlesAdminComponent {

  Categorie:Categorie[] = [];
  videoUrl: string = '';

  submitDisabled=false;
  selectedCategoryId: number=0; // Variable pour stocker l'ID de la catégorie sélectionnée
  article: ArticlesDto = {
    id: 0, // ou toute autre valeur par défaut
    full_description: '',
    image: '',
    videoUrl: '',
    startDate: new Date(),
    description: '',
    titre: '',
    idCatalogue: 0
  };

    constructor( private auth: LoginService,) { } 
  ngOnInit(): void {
    this.getAllCategories();
    console.log("full description" ,this.article.full_description)
}


async handleFile(event: any) {
  const file = event.target.files[0];
  this.submitDisabled = true;

  console.log("file is ",file)

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'eyabenamor'); // Remplacez 'your_upload_preset_name' par votre upload preset
  const cloudName = 'dxcoxu3bn'; // Remplacez 'your_cloud_name' par votre nom de compte Cloudinary

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    this.article.image = res.data.secure_url;
    console.log("Uploaded file:", this.article.image);
    this.submitDisabled=false
  } catch (err) {
    console.error(err);
  }
}

async handleVideo(event: any): Promise<void> {
  try {
    const file = event.target.files[0];
    this.submitDisabled = true;

    console.log("file is ", file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'eyabenamor'); // Remplacez 'your_upload_preset_name' par votre upload preset
    const cloudName = 'dxcoxu3bn'; // Remplacez 'your_cloud_name' par votre nom de compte Cloudinary

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, formData, {
      params: {
        upload_preset: 'eyabenamor', // Remplacez 'your_upload_preset_name' par votre upload preset
        resource_type: 'video' // Définir le type de ressource sur vidéo
      }
    });
    
    this.videoUrl = res.data.secure_url;
    console.log("Uploaded video:", this.videoUrl);
    this.submitDisabled = false;
  } catch (err) {
    console.error(err);
  }
}














getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
}


onSubmit(): void {
  this.article.idCatalogue = this.selectedCategoryId;
  this.auth.createArticle(this.article).subscribe(
    response => {
      console.log('Article créé avec succès:', response);
      alert("Article added successfully");
      // Réinitialiser les valeurs du formulaire après l'ajout réussi de l'article
      this.resetForm();
    },
    error => {
      console.error('Erreur lors de la création de l\'article:', error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  );
}

// Fonction pour réinitialiser les valeurs du formulaire
resetForm(): void {
  this.article = {
    id: 0, // ou toute autre valeur par défaut
    full_description: '',
    image: '',
    videoUrl: '',
    startDate: new Date(),
    description: '',
    titre: '',
    idCatalogue: 0
  };
}
}

