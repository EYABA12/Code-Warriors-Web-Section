import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Contact } from '../../model/Contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact:Contact={
  id:0,
  phoneNumber:'',
  firstName:'',
 lastName:'',

   email:'',
  message:''

}
constructor( private auth: LoginService) { } 
ngOnInit(): void {}

//methode postContact

onSubmit() {
  this.auth.createContact(this.contact).subscribe(
    response => {
      console.log('Contact created successfully:', response);
      alert('Contact created successfully')
      // Réinitialiser le formulaire après la soumission réussie si nécessaire
      this.contact = {id:0,
        phoneNumber:'',
        firstName:'',
       lastName:'',
      
         email:'',
        message:''};
    },
    error => {
      console.error('Error creating contact:', error);
    }
  );
}




}
