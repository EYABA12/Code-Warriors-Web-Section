import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { QuestionDto } from '../../model/QuestionDto.models';
import { User } from '../../model/User.model';
import { Categorie } from '../../model/Categories.model';
import { filteredWords } from '../../model/filtredword.models';

@Component({
  selector: 'app-admin-question',
  templateUrl: './admin-question.component.html',
  styleUrl: './admin-question.component.css'
})
export class AdminQuestionComponent {
  Questions:QuestionDto[] = [];
  users: User[] = [];
  filteredWords: filteredWords[]=[]
  newWord: string = '';
  ListCatgeorie:Categorie[]=[];

  constructor( private auth: LoginService) { } 
  ngOnInit(): void {
    this.getAllQuestions();
    this.loadFilteredWords();

   }



   getAllQuestions(): void {
    this.auth.getAllQuestions().subscribe(
        questionList => {
            this.Questions = questionList;

            // Stocker les IDs des questions à supprimer
            const questionsToDelete: number[] = [];

            this.Questions.forEach(question => {
                this.auth.getUserById(question.idUser).subscribe(
                    user => {
                        this.users.push(user);
                    },
                    error => {
                        console.log("Erreur lors de la récupération des détails de l'utilisateur :", error);
                    }
                );

                this.auth.getCatlogueByid(question.idCatalogue).subscribe(
                    categorie => {
                        this.ListCatgeorie.push(categorie);
                    },
                    error => {
                        console.log("Erreur lors de la récupération des détails de la catégorie :", error);
                    }
                );

                // Vérification des mots filtrés
                if (this.checkForFilteredWords(question)) {
                    questionsToDelete.push(question.id);
                }
            });

            // Supprimer les questions filtrées
            this.deleteFilteredQuestions(questionsToDelete);
        },
        error => {
            console.log("Erreur lors de la récupération des questions :", error);
        }
    );
}

checkForFilteredWords(question: QuestionDto): boolean {
    for (let wordObj of this.filteredWords) {
        let word = wordObj.word;
        if (question.question.includes(word)) {
            // Si un mot filtré est trouvé dans la question, retourner true
            return true;
        }
    }
    return false;
}

deleteFilteredQuestions(questionIds: number[]): void {
    questionIds.forEach(id => {
        this.auth.deleteQuestion(id).subscribe(
            () => {
                console.log(`Question avec l'ID ${id} supprimée avec succès.`);
                                window.location.reload();

                // Implémentez toute autre logique nécessaire après la suppression de la question si nécessaire
            },
            error => {
                console.error('Une erreur s\'est produite lors de la suppression de la question:', error);
                // Gérer l'erreur si nécessaire
            }
        );
    });
}


  loadFilteredWords(): void {
    this.auth.getAllFilteredWords()
      .subscribe(words => this.filteredWords = words);
  }

  addWord(): void {
    if (this.newWord.trim()) {
      this.auth.addFilteredWord(this.newWord.trim())
        .subscribe(() => {
          this.loadFilteredWords();
          this.newWord = '';
        });
    }
  }

  
 





    
  removeQuestion1(id: number): void {
    this.auth.deleteQuestion(id).subscribe(
      () => {
        // Filtrer la liste des utilisateurs pour exclure celui que vous souhaitez supprimer
        this.Questions = this.Questions.filter(question => question.id !== id);
        alert("Question deleted successfully")
      },

      (error) => {
        alert("An error occurred while deleting Question")

      }
    );
  }




}