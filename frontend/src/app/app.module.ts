import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './sign-up/sign-up.component'; // Importez ToastrModule depuis ngx-toastr
import { DatePipe } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
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
import { AllUserComponent } from './all-user/all-user.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AnswerComponent } from './answer/answer.component';
import { AutocompletePipe } from './autocomplete.pipe';
import { TipsComponent } from './tips/tips.component';
import { CatalogueFilterPipe } from '../model/CatalogueFilterPipe';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { FooterComponent } from './footer/footer.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { AllarticleAddminComponent } from './allarticle-addmin/allarticle-addmin.component';
import { ArticleFiltrerPipePipe } from './article-filtrer-pipe.pipe';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    TeamComponent,
    SignInComponent,
    SignUpComponent,
    ContactComponent,
    HeaderComponent,
    NewsletterComponent,
    DashboardComponent,
    AccountComponent,
    InfoSettingComponent,
    ArticleComponent,
    CategorieAdminComponent,
    ArticlesAdminComponent,
    FAQComponent,
    AdminWebsiteManagementComponent,
    About2Component,
    PoliceComponent,
    AddQuestionComponent,
    AllquestionsComponent,
    ProfilUserComponent,
    AllUserComponent,
    AdminContactComponent,
    AnswerComponent,
    AutocompletePipe,
    CatalogueFilterPipe,

    TipsComponent,
      BestPracticesComponent,
      FooterComponent,
      AdminQuestionComponent,
      DiscussionComponent,
      CategorieComponent,
      ViewArticleComponent,
      AllarticleAddminComponent,
      ArticleFiltrerPipePipe,
      HelloComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(), // Ajoutez ToastrModule.forRoot() dans les imports de votre module principal

    ReactiveFormsModule,
    RouterModule.forRoot([]) ,// Importez RouterModule.forRoot([]) ici

    NgToastModule // Ajoutez cette ligne

    
  ],
  exports: [
    // Autres composants, directives, pipes, etc.
    CatalogueFilterPipe
  ],
  providers: [    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
