import { Component } from '@angular/core';
import { ArticlesDto } from '../../model/ArticlesDto.models';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css'
})
export class ViewArticleComponent {
  articlesDto:ArticlesDto={
    id:0,
     image:'',
     videoUrl:'',
     startDate:new Date(),
     description:'',
     full_description:'',

     titre:'',
     idCatalogue:0
  }


  constructor( private auth: LoginService,private route: ActivatedRoute) { } 
  ngOnInit(): void {
   

    this.route.params.subscribe(params => {
      this.articlesDto.id = +params['articleId']; // Utilisation de 'userId' au lieu de 'idUser'

    });
  
    this.getArticleById();
  
    
  
  }





  getArticleById(): void {
    this.auth.getArticleById(this.articlesDto.id).subscribe(
      article => {
          this.articlesDto = article;

          
        
      },
      error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    );
    }  
    
    






}
