import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Faq } from '../../model/Faq.models';
import { Values } from '../../model/Values.models';
import { Police } from '../../model/Police.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Tip } from '../../model/Tips.models';

@Component({
  selector: 'app-admin-website-management',
  templateUrl: './admin-website-management.component.html',
  styleUrl: './admin-website-management.component.css'
})
export class AdminWebsiteManagementComponent {
  questionsAndAnswers: any[]=[];
  titleAndDescription: any[]=[];
  sanitizedText: SafeHtml='' // Assurez-vous que sanitizedText est de type SafeHtml
  allowedChars: SafeHtml = '';
  inputLength: number = 0;

  


  faq: Faq = {
    id: 0, // ou toute autre valeur par défaut
   question:'',
   answer:''
  };
  value:Values={
    id:0,
    title:'',
    description:''
  }

  police: Police = {
    id: 0,
    text: ''
  };
  constructor( private auth: LoginService , private sanitizer: DomSanitizer) { } 
  ngOnInit(): void {
    this.getAllFaqs();
    this.getAllValues();
    this.getPolices(); // Appel de la méthode pour récupérer les données de police


}
//1-methode get all faqs
getAllFaqs(): void {
  this.auth.getAllFaqs().subscribe(data => {
    this.questionsAndAnswers = data;})}

//3-methode post faqs
AddFaq(): void {
  if (this.faq.question.trim() !== '' && this.faq.answer.trim() !== ''){
      this.auth.createFaq(this.faq).subscribe(
        response => {
        // Afficher un message de succès à l'utilisateur si nécessaire
        console.log('Article créé avec succès:', response);
        alert('FAQ created successfully'); 
        this.resetFields();

        },
        error => {
                // Afficher un message d'erreur à l'utilisateur si nécessaire
                alert("Error creating the FAQ"); 

        }
      );
}
else {
  // Display a message to the user indicating that all fields are required
  alert('Please fill out all fields');
  }
}

//4 methode remove faq
removeFaq(id: number): void {
  console.log("id=",id)
  this.auth.removeFaq(id).subscribe(
    () => {
      this.questionsAndAnswers = this.questionsAndAnswers.filter(faq => faq.id !== id);

      console.log('Utilisateur supprimé avec succès');
      alert("Faq deleted successfully")
    },

    (error) => {
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
      alert("'An error occurred while deleting the FAQ")
    }
  );
}

//5 resetFields intialiser les input
resetFields(){
  this.faq.answer=''
  this.faq.question=''
}

//6 methode pour getallVAlue
getAllValues(): void {
  this.auth.getAllValues().subscribe(data => {
    this.titleAndDescription = data;})}

    
 //7 methode pour postvalue 
 AddValue(): void {
  if (this.value.title.trim() !== '' && this.value.description.trim() !== ''){
      this.auth.createValue(this.value).subscribe(
        response => {
        // Afficher un message de succès à l'utilisateur si nécessaire
        console.log('Article créé avec succès:', response);
        alert('Value created successfully'); 
        this.resetFields();

        },
        error => {
                // Afficher un message d'erreur à l'utilisateur si nécessaire
                console.error('Erreur lors de la création de l\'article:', error);
                alert("Error creating the Value"); 

        }
      );
}
else {
  // Display a message to the user indicating that all fields are required
  alert('Please fill out all fields');
  }
}
//8 remove value
removeValue(id: number): void {
  console.log("id=",id)
  this.auth.removeValue(id).subscribe(
    () => {
      this.titleAndDescription = this.titleAndDescription.filter(value => value.id !== id);

      console.log('Utilisateur supprimé avec succès');
      alert("Value deleted successfully")
    },

    (error) => {
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
      alert("'An error occurred while deleting the value")
    }
  );
}

//2-methode de toggle
  toggleQuestion(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const question = target.closest('.question');

    if (question) {
      const answer = question.querySelector('p');

      if (answer) {
        if (question.classList.contains('active')) {
          question.classList.remove('active');
          answer.classList.remove('show');
        } else {
          question.classList.add('active');
          answer.classList.add('show');
        }
      }
    }
  }
  
  updateLength() {
    this.inputLength = this.police.text.length;
}
  getAllowedChars(): void {
    const rawChars = '@ # $ % ^ & * ( ) _ - ., ? < > { } [ ] ! +';
    this.allowedChars = this.sanitizer.bypassSecurityTrustHtml(rawChars); // Sécurisation des caractères autorisés
  }
  getPolices(): void {
    this.auth.getPolice().subscribe(police => { // Appel du service pour récupérer les données de police
      this.police = police; // Affectation des données récupérées à la variable police
      this.sanitizedText = this.sanitizer.bypassSecurityTrustHtml(this.police.text); // Sécurisation du texte de police
      console.log(this.sanitizedText); // Affichage du texte sécurisé dans la console
    });
  }

  updateText() {
    this.auth.updatePolice(this.police.id, this.police)
      .subscribe(updatedPolice => {
        console.log('Police mise à jour:', updatedPolice);
        alert("Police updated successfully")

      });
  }

  
}
