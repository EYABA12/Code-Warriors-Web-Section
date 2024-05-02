import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { InfoSettingComponent } from './info-setting/info-setting.component';
import { ArticleComponent } from './article/article.component';
import { CategorieAdminComponent } from './categorie-admin/categorie-admin.component';
import { ArticlesAdminComponent } from './articles-admin/articles-admin.component';
import { FAQComponent } from './faq/faq.component';
import { AdminWebsiteManagementComponent } from './admin-website-management/admin-website-management.component';
import { About2Component } from './about2/about2.component';
import { PoliceComponent } from './police/police.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AllquestionsComponent } from './allquestions/allquestions.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { HeaderComponent } from './header/header.component';

// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';

// Import the Cloudinary classes.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { AnswerComponent } from './answer/answer.component';
import { AllUserComponent } from './all-user/all-user.component';
import { TipsComponent } from './tips/tips.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { FooterComponent } from './footer/footer.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { AllarticleAddminComponent } from './allarticle-addmin/allarticle-addmin.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HelloComponent } from './hello/hello.component';

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signIn', component: SignInComponent },
  {path:'signUp',component:SignUpComponent},
  {path:'newsletter',component:NewsletterComponent},
  {path:'admin/dashboard',component:DashboardComponent},
  {path:'Account',component:AccountComponent},
  {path:'infoSetting',component:InfoSettingComponent},
  {path:'article',component:ArticleComponent},
  {path:'hello',component:HelloComponent},

  {path:'categorieAdmin',component:CategorieAdminComponent},
  {path:'faq',component:FAQComponent},
  {path:'ContactAdmin',component:AdminContactComponent},
  {path:'bestPracticesAdmin',component:BestPracticesComponent},
  {path:'footer',component:FooterComponent},
  {path:'adminQuestions',component:AdminQuestionComponent},
  {path:'ViewArticle/:articleId',component:ViewArticleComponent},
  { path: 'answers/:IdQuestion/:userId', component: AnswerComponent },
  {path:'allArticlAdmin',component:AllarticleAddminComponent},
  {path:'categorie/:categorieId',component:CategorieComponent},

  {path:'websit-management',component:AdminWebsiteManagementComponent},
  {path:'profilUser/:idUser',component:ProfilUserComponent},
  {path:'tips',component:TipsComponent},

  {path:'ContactUs',component:ContactComponent},
  {path:'articlesAdmin',component:ArticlesAdminComponent},
  {path:'about',component:About2Component},
  {path:'police',component:PoliceComponent},
  {path:'addQuestion',component:AddQuestionComponent},
  {path:'allQuestions',component:AllquestionsComponent},
  {path:'allUsers',component:AllUserComponent},
  {path:'discussion/:userId',component:DiscussionComponent},


  {path:'**',component:HomeComponent}

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
