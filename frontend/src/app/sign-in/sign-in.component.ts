import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  eyeIcon:string = "fa-eye-slash"
  isText: boolean = false;
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;

  type: string = 'password';

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,private toast: NgToastService
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
 // Cette méthode est appelée lorsqu'un utilisateur clique sur l'icône de l'œil pour afficher ou masquer le mot de passe.
hideShowPass() {
  // Inverse la valeur de isText. Si isText est true, il devient false et vice versa.
  this.isText = !this.isText;
  
  // Met à jour l'icône de l'œil en fonction de la valeur actuelle de isText.
  // Si isText est true, l'icône de l'œil ouvert est affichée, sinon l'icône de l'œil barré est affichée.
  this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
  
  // Met à jour le type du champ de saisie du mot de passe en fonction de la valeur actuelle de isText.
  // Si isText est true, le type est défini sur 'text', ce qui rend le texte visible.
  // Sinon, le type est défini sur 'password', ce qui masque le texte.
  this.isText ? this.type = 'text' : this.type = 'password';
}

onLogin() {
  if (this.loginForm.valid) {
      const userObject = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
      };

      this.auth.login(userObject).subscribe(
          (res) => {
              alert(res.message);
              localStorage.setItem('clientId', res.userId);
              this.loginForm.reset();

              // Vérifie le rôle de l'utilisateur dans la réponse
              const userRole = res.role;

              // Redirige l'utilisateur en fonction de son rôle
              if (userRole === 'ADMIN') {
                  this.router.navigate(['/admin/dashboard']);
              } else {
                  this.router.navigate(['/user/dashboard']);
              }

              // Définissez d'autres informations utilisateur dans le stockage local si nécessaire
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('userName', res.userName);
          },
          (err) => {
              alert(err.error.message);
          }
      );
  }
}
}