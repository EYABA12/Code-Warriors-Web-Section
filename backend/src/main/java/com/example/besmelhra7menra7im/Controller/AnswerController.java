package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.QuestionRepository;
import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.Service.AnswerService;
import com.example.besmelhra7menra7im.Service.CatalogueService;
import com.example.besmelhra7menra7im.Service.QuestionService;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.dto.AnswerDto;
import com.example.besmelhra7menra7im.dto.QuestionDto;
import com.example.besmelhra7menra7im.entities.Answer;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Question;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


    @RestController
    @RequestMapping(path = "api/")
    public class AnswerController {
        @Autowired

        private final QuestionService questionService;
        private final QuestionRepository questionRepository;
        private final UserService userService;
        private final UserRepository userRepository;
        private final AnswerService answerService;

        public AnswerController(QuestionService questionService, QuestionRepository questionRepository, UserService userService, UserRepository userRepository,AnswerService answerService)
        {
            this.questionService = questionService;
            this.questionRepository = questionRepository;
            this.userService = userService;
            this.userRepository = userRepository;
            this.answerService=answerService;
        }

        //1-postAnswer
        @PostMapping("/answers")
        public AnswerDto AddAswer(@RequestBody AnswerDto answerDto) {
            Answer answer = new Answer();
            User user = this.userService.getUser(answerDto.idUser);
            Question question =this.questionService.getQuestionById(answerDto.idQuestion);

            answer.setUser(user);
            answer.setQuestion(question);
            answer.setAnswer(answerDto.answer);
            answer.setDate(answerDto.dateAnswer);
            System.out.println("voila answer"+answer);
            answerService.AddAnswer(answer);
            return answerDto;

        }


        //1-getAllAnswer
        @GetMapping("/answers")
        public List<AnswerDto> getAllAnswers() {
            List<Answer> answers = answerService.getAllanswers();
            // Mapper les articles en DTOs
            List<AnswerDto> answerDtos = answers.stream()
                    .map(AnswerDto::new)
                    .collect(Collectors.toList());
            return answerDtos;
        }

        //3-getmethode:idanswer---->son answer
        @GetMapping("/answers/{id}")
        public AnswerDto getAnswerByid(Long id) {
            Answer answer = answerService.getAnswerById(id);
            // Mapper l'objet Question à un objet QuestionDto

            AnswerDto answerDto = new AnswerDto(answer);

            return answerDto;

        }

        // 3-getAnswerByIdQuestion
        @GetMapping("/answers/question")
        public List<AnswerDto> getQuestionByIdQuestion(@RequestParam Long idQuestion) {
            List<Answer> answers = answerService.getAllAnswerByidQuestion(idQuestion);
            List<AnswerDto> answerDtos = answers.stream()
                    .map(AnswerDto::new)
                    .collect(Collectors.toList());
            return answerDtos;

        }

        // 4-getAnswerByIdUser
        @GetMapping("/answers/user")
        public List<AnswerDto> getAnswerByidUser(@RequestParam Long id) {
            List<Answer> answers = answerService.getAnswerByidUser(id);
            List<AnswerDto> answerDtos = answers.stream()
                    .map(AnswerDto::new)
                    .collect(Collectors.toList());
            return answerDtos;

        }

        //deleteAnswerById
        @DeleteMapping("answers/{id}")
        public void deleteAnswer(@PathVariable("id") long id) {
            answerService.deleteAnswer(id);
        }


    }
