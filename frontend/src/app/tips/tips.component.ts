import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Tip } from '../../model/Tips.models';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {
  filterValue='';

  Tips:Tip[] = [];


  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllTips()
   }
   getAllTips(): void {
      this.auth.getAllTips()
        .subscribe(tips => {
          this.Tips = tips;
                 });
    }

    

   
}
