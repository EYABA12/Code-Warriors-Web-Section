import { Component } from '@angular/core';
import { Categorie } from '../../model/Categories.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-categorie-admin',
  templateUrl: './categorie-admin.component.html',
  styleUrl: './categorie-admin.component.css'
})
export class CategorieAdminComponent {
  Categorie:Categorie[] = [];
  showInput: boolean = false;

 categorie:Categorie ={
    id: 0,
    nomCatalogue:''}

  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllCategories();
}

addCategory(): void {
  if (this.categorie.nomCatalogue.trim() !== '' ){
      this.auth.createCategorie(this.categorie).subscribe(
        response => {
        alert('Category created successfully'); 

       this. categorie.nomCatalogue=''
        },
        error => {
                // Afficher un message d'erreur à l'utilisateur si nécessaire
                console.error('Erreur lors de la création de l\'article:', error);
                alert("Error creating Category"); 

        }
      );
}
else {
  // Display a message to the user indicating that all fields are required
  alert('Please fill out all fields');
  }
}



getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
}
removeCategory(id: number): void {
    this.auth.deleteCatalogue(id)
      .subscribe(() => {
        this.Categorie = this.Categorie.filter(categorie => categorie.id !== id);
        alert("Category deleted successfully")

      },
      (error) => {
        alert("'An error occurred while deleting Category")
      }
      );
  }

}
