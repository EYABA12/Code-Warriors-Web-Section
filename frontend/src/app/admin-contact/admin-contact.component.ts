import { Component } from '@angular/core';
import { Contact } from '../../model/Contact.model';
import { LoginService } from '../login.service';
import { EmailService } from '../email.service';
import { Touche } from '../../model/Touche.models';
import { Testimonial } from '../../model/Testimonial.models';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent {
  contacts: Contact[] = [];
  touches:Touche[]=[];
  testimonials:Testimonial[]=[]
  showPopup: boolean = false;
  showPopup2: boolean = false;
  newTestimonial: Testimonial = {
    author: '',
    message: '',
    id: 0
  };
  replyMessage: string = '';
  currentContact!: Contact; // Ajoutez un point d'exclamation pour indiquer que la variable sera initialisée ultérieurement
  currentContact2!: Touche; // Ajoutez un point d'exclamation pour indiquer que la variable sera initialisée ultérieurement
  replyMessage2:string=''
  constructor(private auth: LoginService, private SendEmail: EmailService) { }

  ngOnInit(): void {
    this.getAllContact();
    this.getAllTouches();
    this.loadTestimonials();
  }

  getAllContact(): void {
    this.auth.getAllContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }
  getAllTouches(): void {
    this.auth.getAllTouches()
      .subscribe(contacts => {
        this.touches = contacts;
      });
  }

  loadTestimonials(): void {
    this.auth.getAllTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  } 
  openPopup2(contact2: Touche): void {
    this.showPopup = true;
    this.currentContact2 = contact2; // Stocker le contact actuel
  }


  openPopup(contact: Contact): void {
    this.showPopup = true;
    this.currentContact = contact; // Stocker le contact actuel
  }

  closePopup(): void {
    this.showPopup = false;
    // Réinitialiser le message de réponse lorsque la popup est fermée
    this.replyMessage = '';
  }

  replyToContact(): void {
    if (!this.replyMessage) {
      alert('Please enter a message before sending.'); // Affiche un message d'erreur si le champ du message est vide
      return; // Arrête l'exécution de la fonction
    }

    if (this.currentContact) {
      const formData = new FormData();
      formData.append('to', this.currentContact.email);
      formData.append('subject', 'Re: Your message');
      formData.append('body', 'Reply: ' + this.replyMessage);
  
      this.SendEmail.sendNewsletter(formData)
        .subscribe({
          next: (response) => {
            alert ("Response successfully sent to the user's email!")
            this.replyMessage = ''; // Réinitialiser le message de réponse après l'envoi
            this.closePopup(); // Fermer la popup après l'envoi
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi de la réponse : ', error);
          }
        });
    } else {
      console.error('Aucun contact sélectionné pour répondre.');
    }
  }






  addTestimonial(): void {
    if (!this.newTestimonial.author || !this.newTestimonial.message) { // Vérifier si les champs sont vides
      alert('Please fill out all fields');
      return;
    }

    this.auth.createTestimonial(this.newTestimonial).subscribe(
      response => {
        console.log('Testimonial created successfully:', response);
        alert('Testimonial created successfully');
        this.resetFields();
      },
      error => {
        console.error('Error creating testimonial:', error);
        alert('Error creating testimonial');
      }
    );
  }
  //5 resetFields intialiser les input
resetFields(){
  this.newTestimonial.author=''
  this.newTestimonial.message=''
}


  replyToContact2(): void {
    if (!this.replyMessage2) {
      alert('Please enter a message before sending.'); // Affiche un message d'erreur si le champ du message est vide
      return; // Arrête l'exécution de la fonction
    }


    if (this.currentContact2) {

      const formData = new FormData();
      formData.append('to', this.currentContact2.email);
      formData.append('subject', 'Re: Your message');
      formData.append('body', 'Reply: ' + this.replyMessage2);
  
      this.SendEmail.sendNewsletter(formData)
        .subscribe({
          next: (response) => {
            console.log('Response sent successfully!', response);
            alert ('Response sent successfully!')
            this.replyMessage2 = ''; // Réinitialiser le message de réponse après l'envoi
            this.closePopup(); // Fermer la popup après l'envoi
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi de la réponse : ', error);
            alert(error)
          }
        });
    } 
  }
}