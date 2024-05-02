import { Pipe, PipeTransform } from '@angular/core';
import { ArticlesDto } from './ArticlesDto.models';
@Pipe({
  name: 'Articlefilter'
})
export class ArticlePipe implements PipeTransform {
    transform(articles: ArticlesDto[], filterText: string): ArticlesDto[] {
        if (!filterText || filterText.trim() === '') {
          return articles;
        }
    
        return articles.filter(article => 
          article.titre.toLowerCase().includes(filterText.toLowerCase())
        );
      }
    
    }