import { Component } from '@angular/core';
import { User } from '../../model/User.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent {
  searchEmail=''


  Users:User[] = [];
  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.loadFirstFourAccounts();
    this.getAllUser()
console.log("geetuser",this.Users)
   }
    getAllUser(): void {
      this.auth.getAllUsers()
        .subscribe(users => {
          this.Users = users;
          this.Users.forEach(user => {
            if (!user.image) {
              user.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360";
            }
          });
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


   
}
