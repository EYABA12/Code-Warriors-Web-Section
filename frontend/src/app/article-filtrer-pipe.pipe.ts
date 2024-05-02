import { Pipe, PipeTransform } from '@angular/core';
import { ArticlesDto } from '../model/ArticlesDto.models';

@Pipe({
  name: 'articleFiltrerPipe'
})
export class ArticleFiltrerPipePipe implements PipeTransform {
  transform(articles: ArticlesDto[], filterText: string): ArticlesDto[] {
    if (!filterText || filterText.trim() === '') {
      return articles;
    }

    return articles.filter(article => 
      article.titre.toLowerCase().includes(filterText.toLowerCase())
    );
  }
 

}
