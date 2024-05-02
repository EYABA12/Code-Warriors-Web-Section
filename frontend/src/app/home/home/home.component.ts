import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../email.service';
import { LoginService } from '../../login.service';
import { Touche } from '../../../model/Touche.models';
import { Testimonial } from '../../../model/Testimonial.models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emailForm!: FormGroup; // Déclarer une variable pour stocker le formulaire
  testimonials: Testimonial[] =[]
  visibleTestimonials: Testimonial[] = [];
  initialTestimonialCount: number = 3; // Nombre initial de témoignages à afficher
  additionalTestimonialCount: number = 3; // Nombre de témoignages à charger à chaque fois


  "touch":Touche = {
    id: 0,
    name: '',
    email: '',
    message: ''
  };


  constructor(private formBuilder: FormBuilder, private auth: EmailService,private auth2: LoginService,) { } // Injecter le FormBuilder pour créer le formulaire

  ngOnInit(): void {
    this.loadTestimonials();
    this.loadTestimonials();

    // Initialiser le formulaire avec les contrôles et les règles de validation
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]] // Champ d'e-mail avec validation requise et format e-mail
    });
  }
 

  onSubmit() {
    console.log( this.emailForm.value); // Afficher l'e-mail dans la console (à remplacer par l'envoi au serveur)
     // Récupérer la valeur de l'e-mail à partir du formulaire

    if (this.emailForm.valid) { // Vérifier si le formulaire est valide avant de le soumettre
      const email = this.emailForm.value.email; // Récupérer la valeur de l'e-mail à partir du formulaire
      console.log('Email submitted:', email); // Afficher l'e-mail dans la console (à remplacer par l'envoi au serveur)
      const userId = localStorage.getItem('clientId'); // Récupérer l'ID de l'utilisateur depuis le stockage local
      if (!userId) { // Vérifie si l'ID de l'utilisateur n'est pas présent dans le stockage local
        console.error('User ID not found in local storage'); // Affiche une erreur dans la console
        return; // Sort de la fonction sans exécuter la requête
      }

      // Si l'ID de l'utilisateur est présent dans le stockage local, procéder à l'envoi de la demande
      this.auth.subscribeEmail(+userId, email).subscribe( // Appelle la méthode subscribeEmail du service auth avec l'ID converti en nombre et l'adresse e-mail
        (response) => { // Fonction de rappel en cas de succès de la requête
          alert("Email Subscription Successful"); // Affiche un message d'alerte avec le message de succès de la réponse

          // Traitez la réponse de l'API si nécessaire
        },
        (error) => { // Fonction de rappel en cas d'erreur de la requête
          alert("Email Subscription Failed"); // Affiche un message d'alerte avec le message de succès de la réponse

          // Traitez l'erreur de l'API si nécessaire
        }
      );}}

      onSubmitgetInTouch(){
        this.auth2.createGetInTouch(this.touch).subscribe(
          response => {
            alert('Message sent successfully.');
            this.touch = {
              id: 0,
              name: '',
              email: '',
              message: ''
            }; // Réinitialiser les champs de 'touch' après l'envoi réussi
          },
          error => {
            console.error('Error creating contact:', error);
          }
        );
      }


      testimonialsVisible = false;

      toggleTestimonials(): void {
        this.testimonialsVisible = !this.testimonialsVisible;
      }
      currentTestimonialIndex: number = 0;

  
      loadTestimonials(): void {
        this.auth2.getAllTestimonials().subscribe(
          testimonials => this.testimonials = testimonials,
          error => console.error('Erreur lors de la récupération des témoignages:', error)
        );
      }
    
      // Méthode pour charger plus de témoignages
      loadMoreTestimonials(): void {
        this.initialTestimonialCount += this.additionalTestimonialCount;
      }
    }