import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Tip } from '../../model/Tips.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-best-practices',
  templateUrl: './best-practices.component.html',
  styleUrl: './best-practices.component.css'
})
export class BestPracticesComponent {
  tips:Tip[]=[];
  updatedTip: Tip = { id: 0, title: '', description: '',interestRate:0 }; // Ajout de la propriété updatedTip

  tip: Tip = 
  { id: 0,
     title: '',
   description: '',
   interestRate: 0,
     }; // Initialisation d'un objet Tip
  constructor( private auth: LoginService ,private router: Router ,private route: ActivatedRoute) { } 
  ngOnInit(): void {
    this.getAllTip();


}
getAllTip():void{
  this.auth.getAllTips().subscribe(data=>{
    this.tips=data
  })
}



  addTip(): void {
    if (this.tip.title.trim() !== '' && this.tip.description.trim() !== ''){

      console.log("this.tip.title",this.tip.title
      )
        this.auth.createTip(this.tip).subscribe(
          response => {
          alert('Tip created successfully'); 
         // Désactive la stratégie de réutilisation des routes pour forcer le rechargement de la route
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        // Configure le comportement de navigation pour recharger la route si l'utilisateur est déjà sur la même URL
          this.router.onSameUrlNavigation = 'reload';

        // Navigue vers la route actuelle pour déclencher le rechargement de la route
          this.router.navigate(['.'], { relativeTo: this.route });
          },
          error => {
                  alert("Error creating the Tip"); 
  
          }
        );
  }
  else {
    // Display a message to the user indicating that all fields are required
    alert('Please fill out all fields');
    }
  }


  removeTip(id: number): void {
    this.auth.deleteTip(id)
      .subscribe(() => {
        this.tips = this.tips.filter(tip => tip.id !== id);
        alert("Tip deleted successfully")

      },
      (error) => {
        alert("'An error occurred while deleting the Tip")
      }
      );
  }


  //4 methode remove faq

 
  
}
