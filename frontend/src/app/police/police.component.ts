import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Police } from '../../model/Police.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrl: './police.component.css'
})
export class PoliceComponent  implements OnInit{
  sanitizedText: SafeHtml='' // Assurez-vous que sanitizedText est de type SafeHtml
  allowedChars: SafeHtml = ''; // Initialisation avec une chaîne vide

  police: Police = {
    id: 0,
    text: ''
  };

  constructor(private auth: LoginService, private sanitizer: DomSanitizer) { } 
  ngOnInit(): void {
    this.getPolices(); // Appel de la méthode pour récupérer les données de police
    this.getAllowedChars(); // Appel de la méthode pour définir les caractères autorisés
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
}
