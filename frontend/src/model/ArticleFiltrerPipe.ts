import { Pipe, PipeTransform } from '@angular/core';
import { ArticlesDto } from './ArticlesDto.models';
@Pipe({
  name: 'ArticleFiltrerPipe'
})
export class ArticleFiltrerPipe implements PipeTransform {
    transform(articles: ArticlesDto[], filterText: string): ArticlesDto[] {
        if (!filterText || filterText.trim() === '') {
          return articles;
        }
    
        return articles.filter(article => 
          article.titre.toLowerCase().includes(filterText.toLowerCase())
        );
      }
    
    }