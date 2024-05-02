package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.MessageService;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.dto.MessageDto;
import com.example.besmelhra7menra7im.entities.Message;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/")
public class MessageController {
    @Autowired

    private final MessageService messageService;
    private final UserService userService;
    public MessageController(MessageService messageService,UserService userService){
        this.messageService=messageService;
        this.userService=userService;
    }

    @GetMapping("/messages")
    public List<MessageDto> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();
        // Mapper les articles en DTOs
        List<MessageDto> messageDtos = messages.stream()
                .map(MessageDto::new)
                .collect(Collectors.toList());
        // Ce code prend une liste d'objets Produit.
        //Il transforme chaque objet Produit en un objet ProduitDto.
        //  Pour réaliser cette transformation, il utilise une méthode appelée référence de constructeur (ProduitDto::new).
        //  Ensuite, il collecte ces objets transformés dans une liste.
        //  Enfin, il renvoie la liste des objets ProduitDto.
        return messageDtos;
    }



    //1-postquestion
    @PostMapping("/messages")
    public MessageDto AddMessage(@RequestBody MessageDto messageDto) {
        Message mes = new Message();
        User receiver = this.userService.getUser(mes.getIdReceiver());
        User sender=this.userService.getUser(mes.getIdSender());
        mes.setDate(mes.getDate());
        mes.setReceiver(receiver);
        mes.setSender(sender);
        mes.setContent(mes.getContent());
        messageService.createMessage(mes);
        return messageDto;

    }


    // 4-getQuestionsByIdUser
    @GetMapping("/messages/user")
    public List<MessageDto> getMessageByIdUser(@RequestParam Long id) {
        List<Message> messages = messageService.getAllMessagesByUserId(id);
        List<MessageDto> messageDtos = messages.stream()
                .map(MessageDto::new)
                .collect(Collectors.toList());
        return messageDtos;

    }

}