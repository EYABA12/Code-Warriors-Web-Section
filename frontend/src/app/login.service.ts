import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { Categorie } from '../model/Categories.model';
import {  ArticlesDto } from '../model/ArticlesDto.models';
import { Police } from '../model/Police.models';
import { QuestionDto } from '../model/QuestionDto.models';
import { AnswersDto } from '../model/AnswersDto.models';
import { Testimonial } from '../model/Testimonial.models';
import { Tip } from '../model/Tips.models';
import { Message } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }
  login(userObject:any): Observable<any> { // La fonction renvoie un tableau d'employés, donc il faut utiliser Observable<Employee[]>
    return this.http.post<any>('http://localhost:4200/api/users/authenticate' ,userObject);
  }
  
  signUp(userObject:any): Observable<any> { // La fonction renvoie un tableau d'employés, donc il faut utiliser Observable<Employee[]>
    return this.http.post<any>('http://localhost:4200/api/users',userObject);
  }
  getSubscribedUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4200/api/users/subscribed');
  }
  updateProfile(userProfileData: any): Observable<any> {
    return this.http.patch(`http://localhost:4200/api/users/${userProfileData.id}`, userProfileData);
  }
  getUpdatedUser(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:4200/api/users/${id}`);
  }
  getAllUsers():Observable<any>{
    return this.http.get<User[]>('http://localhost:4200/api/users')
  }
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:4200/api/users/${id}`);
  }

  getArticleById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:4200/api/articles/${id}`);
  }
getCatlogueByid(id: any): Observable<any> {
  return this.http.get<any>(`http://localhost:4200/api/catalogues/${id}`);
}
createAnswer(answerDto:any): Observable<any> {
  
  return this.http.post(`http://localhost:4200/api/answers`, answerDto);
}
getAnswerByIdQuestion(idQuestion: number): Observable<AnswersDto[]> {
  const params = new HttpParams().set('idQuestion', idQuestion.toString());
  return this.http.get<AnswersDto[]>('http://localhost:4200/api/answers/question', { params });
}



  signOut() {
    localStorage.clear();
    this.router.navigate(['/signin'])
  }
  getFirstFourUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/users/four?limit=3')
  }
  getAllCategorie():Observable<any>{
    return this.http.get<Categorie[]>('http://localhost:4200/api/catalogues')
  }
  removeUser(id: number): Observable<any> {
    // Utilisez backticks (`) pour définir une chaîne de caractères de modèle afin d'interpoler l'ID
    return this.http.delete<any>(`http://localhost:4200/api/users/remove/${id}`);
  }
  removeArticle(id:number): Observable<any> {
    // Utilisez backticks (`) pour définir une chaîne de caractères de modèle afin d'interpoler l'ID
    return this.http.delete<any>(`http://localhost:4200/api/articles/${id}`);
  }
  getAllArticls():Observable<any>{
    return this.http.get<ArticlesDto[]>('http://localhost:4200/api/articles')
  }
  getCategoriesProduit(catalogueIds: number[]): Observable<any> {
    // Utilisez les identifiants de catalogue fournis pour construire la requête
    const params = new HttpParams().set('IDs', catalogueIds.join(','));
  
    return this.http.get('http://localhost:4200/api/catalogues', { params });
  }
  createArticle(article: any): Observable<any> {
  
    return this.http.post(`http://localhost:4200/api/articles`, article);
  }
  getAllFaqs():Observable<any>{
    return this.http.get<any[]>('http://localhost:4200/api/faqs')
  }
  getAllTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>('http://localhost:4200/api/testimonials');
  }
  getAllContacts():Observable<any>{
    return this.http.get<any[]>('http://localhost:4200/api/contacts')
  }
  createContact(contact:any):Observable<any>{
    return this.http.post('http://localhost:4200/api/contacts',contact)
  }
  createGetInTouch(touch:any):Observable<any>{
    return this.http.post('http://localhost:4200/api/touches',touch)
  }
  getAllTouches():Observable<any>{
    return this.http.get<any[]>('http://localhost:4200/api/touches')
  }

createFaq(faq:any):Observable<any>{
  return this.http.post('http://localhost:4200/api/faqs',faq)
}

createCategorie(catalogue:any):Observable<any>{
  return this.http.post('http://localhost:4200/api/catalogues',catalogue)
}
createTestimonial(testimonial:any):Observable<any>{
  return this.http.post('http://localhost:4200/api/testimonials',testimonial)
}

 // Mettre à jour une astuce existante
 updateTip(id: number, tip: Tip): Observable<Tip> {
  return this.http.put<Tip>('http://localhost:4200/api/tips', tip);
}

subscribeEmail(id: number, emailSubscription: string): Observable<any> {
  const url = `http://localhost:4200/api/users/email/${id}`;
  const body = { emailSubscription: emailSubscription };
  return this.http.patch(url, body);
}

// Supprimer une astuce
deleteTip(id: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:4200/api/tips/${id}`)
}
deleteQuestion(id: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:4200/api/questions/${id}`)
}

deleteCatalogue(id: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:4200/api/catalogue/${id}`)
}
getAllFilteredWords(): Observable<any> {
  return this.http.get<any>('http://localhost:4200/api/filtered-words');
}

addFilteredWord(word: string): Observable<any> {
  return this.http.post('http://localhost:4200/api/filtered-words', { word });
}
getQuestionById(id: number): Observable<any> {
  return this.http.get<any>(`http://localhost:4200/api/questions/${id}`);
}

getAllTips(): Observable<Tip[]> {
  return this.http.get<Tip[]>('http://localhost:4200/api/tips');
}


// Méthode pour créer un nouveau tip
createTip(tip: Tip): Observable<Tip> {
  return this.http.post<Tip>('http://localhost:4200/api/tips', tip);
}






removeFaq(id:number):Observable<any>{
  return this.http.delete<any>(`http://localhost:4200/api/faqs/${id}`);
}
getAllValues():Observable<any>{
  return this.http.get<any[]>('http://localhost:4200/api/values')
}
getAllQuestions():Observable<any>{
  return this.http.get<any[]>('http://localhost:4200/api/questions')
}
createValue(faq:any):Observable<any>{
  return this.http.post('http://localhost:4200/api/values',faq)
}
removeValue(id:number):Observable<any>{
  return this.http.delete<any>(`http://localhost:4200/api/values/${id}`);
}
getPolice():Observable<Police>{
  return this.http.get<Police>('http://localhost:4200/api/polices')
}
updatePolice(id: number, updatedPolice: Police): Observable<Police> {
  return this.http.patch<Police>(`http://localhost:4200/api/polices/${id}`, updatedPolice);
}
createQuestion(QuestionDto:any):Observable<any>{
  return this.http.post('http://localhost:4200/api/questions',QuestionDto)}
 

  getQuestionsByCatalogueId(catalogueId: number): Observable<QuestionDto[]> {
    const params = new HttpParams().set('idcatalogue', catalogueId.toString());
    return this.http.get<QuestionDto[]>('http://localhost:4200/api/questions/catalogue', { params });
  }

  getArticlesByCataloguesId(catalogueId: number): Observable<ArticlesDto[]> {
    const params = new HttpParams().set('idcatalogue', catalogueId.toString());
    return this.http.get<ArticlesDto[]>('http://localhost:4200/api/articles/catalogue', { params });
  }



  
   getQuestionsByUserId(id:any): Observable<QuestionDto[]>{
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<QuestionDto[]>('http://localhost:4200/api/questions/user', {params });
  }



  getAllMessages(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/messages');
  }

  sendMessage(message: Message): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/messages', message);
  }

  getMessagesByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:4200/api/messages/user/${userId}`);
  }






}




