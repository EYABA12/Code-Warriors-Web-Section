import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { ArticlesDto } from '../../model/ArticlesDto.models';
import { Categorie } from '../../model/Categories.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  articlesDto:ArticlesDto[] = [];
  Categorie:Categorie[] = [];
  filterText = '';
  filteredArticles: ArticlesDto[] = [];

  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllArticles();
    this.getAllCategories();
    this.filteredArticles = []; // Initialisation avec une liste vide


    
}
onFilterChange(): void {
    this.filteredArticles = this.articlesDto.filter(article =>
      article.titre.toLowerCase().includes(this.filterText.toLowerCase())

    );
    console.log("fitrre",this.filterText)
  }


getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log("notre categore ",categorie)
    });
  }
//1 get all articles 
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









//getTouslesarticles by categoryId
  fetchArticlesByCategoryId(CategoryId: number): void {
    this.auth.getArticlesByCataloguesId(CategoryId)
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






/*getCategoriesForArticle(article: Articles): void {
  console.log(article);
  article.categories = [];

  // Récupérer les catégories pour chaque identifiant de catalogue de l'article
  article.cataloguesIds.forEach(catalogueId => {
    this.auth.getCategoriesProduit([catalogueId])
      .subscribe(categories => {
        console.log('Catégories pour l\'article avec ID ' + article.id + ':', categories);
        // Faire quelque chose avec les catégories, par exemple, les ajouter à l'objet article
        article.categories.push(...categories);
        

      });
      console.log(article.categories)
  });
}*/


}
