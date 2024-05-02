import { Pipe, PipeTransform } from '@angular/core';
import { Tip } from './Tips.models';
@Pipe({
  name: 'catalogueFilter'
})
export class CatalogueFilterPipe implements PipeTransform {

  transform(tips: Tip[], value: string): Tip[] {
    if (!value || value.trim() === '') {
      return tips;
    }

    return tips.filter(tips => 
      tips.title.toLowerCase().includes(value.toLowerCase())
    );
  }

 


}
