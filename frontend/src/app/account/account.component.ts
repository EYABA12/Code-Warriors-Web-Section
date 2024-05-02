import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../../model/User.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  Users:User[] = [];
  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.loadFirstFourAccounts();
console.log("geetuser",this.Users)
   }
    getAllUser(): void {
      this.auth.getAllUsers()
        .subscribe(users => {
          this.Users = users;
           console.log(users)
        });
    }
    loadFirstFourAccounts(): void {
      this.auth.getFirstFourUsers()
        .subscribe(users => {
          this.Users = users;
          console.log("liste de users",this.Users)

        });
        console.log(this.Users)
    }
    removeClient(id: number): void {
      console.log("id=",id)
      this.auth.removeUser(id).subscribe(
        () => {
          // Filtrer la liste des utilisateurs pour exclure celui que vous souhaitez supprimer
          this.Users = this.Users.filter(user => user.id !== id);
          console.log('Utilisateur supprimé avec succès');
        },

        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
        }
      );
    }

    }
