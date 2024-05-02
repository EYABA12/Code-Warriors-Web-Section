import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-about2',
  templateUrl: './about2.component.html',
  styleUrl: './about2.component.css'
})
export class About2Component {
  titleAndDescription: any[]=[];

  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllValues();
}
getAllValues(): void {
  this.auth.getAllValues().subscribe(data => {
    this.titleAndDescription = data;})}
}
