import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/User.model'; // Import du modèle User

@Pipe({
  name: 'autocomplete' // Nom du pipe à utiliser dans le template
})
export class AutocompletePipe implements PipeTransform {

  transform(users: User[], value: string): User[] {
    // Filtrer les utilisateurs dont l'email ou le nom contient la valeur de recherche
    return users.filter(user => 
      user.userName.toLowerCase().includes(value.toLowerCase()) // Vérifie si le nom d'utilisateur contient la valeur de recherche (en ignorant la casse)
      // Ajoutez d'autres conditions selon les propriétés que vous voulez rechercher
    );
  }

}
