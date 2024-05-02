package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.AnswerRepository;
import com.example.besmelhra7menra7im.Repository.QuestionRepository;
import com.example.besmelhra7menra7im.entities.Answer;
import com.example.besmelhra7menra7im.entities.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AnswerService {
    @Autowired
        private final AnswerRepository answerRepository;
        public AnswerService(AnswerRepository answerRepository){
            this.answerRepository=answerRepository;
        }



        //1-Add answer
            public Answer AddAnswer(Answer answer) {

                return answerRepository.save(answer);
            }


         //methode:tout les answer  existant
            public List<Answer> getAllanswers(){
                    return answerRepository.findAll();
             }



    //methode:idCatalogue--->touslesquestion
    public List<Answer> getAllAnswerByidQuestion(Long idQuestion ){
        List<Answer> answers = answerRepository.findByQuestionId(idQuestion);
        return answers;}


    //methode:idUser--->touslesreponse
    public List<Answer> getAnswerByidUser(Long idUser){
        List<Answer> answers = answerRepository.findByUserId(idUser);
        return answers;}


    //methode:idanswer----->son repnse assocè
    public Answer getAnswerById(Long id){
        Optional<Answer> optionalAnswer= answerRepository.findById(id);
        return optionalAnswer.orElse(null);
        // Récupérer la reponse correspondant à l'ID donné, retourne un Optional<Answer>
        // Si la answer est présente dans l'Optional, la retourner
        // Sinon, retourner null (vous pouvez également lancer une exception ici si la question doit être obligatoirement présente)
    }

    //methode id-->remove reponse
    public void deleteAnswer(Long id) {
        boolean exist = answerRepository.existsById(id);

        if (exist) {
            answerRepository.deleteById(id);
        } else {
            throw new IllegalStateException(
                    "question with id " + id + " does not exist "
            );
        }
    }






}

