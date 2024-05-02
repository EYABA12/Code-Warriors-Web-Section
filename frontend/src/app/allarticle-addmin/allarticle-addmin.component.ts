import { Component } from '@angular/core';
import { ArticlesDto } from '../../model/ArticlesDto.models';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-allarticle-addmin',
  templateUrl: './allarticle-addmin.component.html',
  styleUrl: './allarticle-addmin.component.css'
})
export class AllarticleAddminComponent {
  articlesDto:ArticlesDto[] = [];
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




  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllArticles();


    
}


removeArticle(id: number): void {
  console.log("idde article supprim est ",id)
  this.auth.removeArticle(id).subscribe(
    () => {
      console.log("idde article supprim est ",id)
      this.articlesDto = this.articlesDto.filter(article => this.article.id !== id);

      console.log('Utilisateur supprimé avec succès');
      alert("Article deleted successfully")
    },

    (error) => {
      alert("'An error occurred while deleting the value")
    }
  );
}




  getAllArticles(): void {
    this.auth.getAllArticls()
      .subscribe(article => {
        this.articlesDto = article;
        console.log('les articles tous dont ',this.articlesDto)
        this.articlesDto.forEach(article => {
          console.log(article.image);
          console.log(article.idCatalogue)
       //   this.getCategoriesForArticle(article);
  
        });
        //Articles est l'interface définissant la structure des articles.
        //articles (en minuscules) est une variable 
        //locale contenant la liste d'articles récupérée du service dans votre composant.
      });
  }
}
