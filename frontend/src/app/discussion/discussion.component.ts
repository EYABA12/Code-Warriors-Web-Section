import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/User.model';
import { Message } from '../../model/Message.models';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {



  
  userIdClientConnecte:number=0;
  MessageDto:Message={
    id:0,
    content:'',
    senderId:0,
    receiverId:0,
    date:new Date()
  }
messages:Message[]=[]

  users:User[]=[]
userConnect: User = {
  id:0,
  image:'',
userName: '',
firstName:'',
lastName:'',
phoneNumber:'',
place:'',
email: '',
emailSubscription: '',
password: '',
confirmPassword: '',
registrationDate: '',
university:'',
work:'',

 
};


userId:number=0;


  constructor( private auth: LoginService,private route: ActivatedRoute) { } 
  ngOnInit(): void {
    const userIdClientConnecte = localStorage.getItem('clientId');

    this.route.params.subscribe(params => {
      this.MessageDto.receiverId = +params['userId']; 
      this.MessageDto.senderId=this.userIdClientConnecte
     });  
     this.loadMessages();

  }



  loadMessages(): void {
    this.auth.getAllMessages().subscribe(
      messages => this.messages = messages,
      error => console.log(error)
    );
  }

  



  }