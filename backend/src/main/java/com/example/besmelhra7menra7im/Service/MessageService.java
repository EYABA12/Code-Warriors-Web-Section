package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.MessageRepository;
import com.example.besmelhra7menra7im.entities.Message;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository=messageRepository;}


    //creation message
    public Message createMessage (Message message){

        messageRepository.save(message);
        return message;
    }



    //get all message
    public List<Message> getAllMessages () {
        return messageRepository.findAll();
    }

    //getAllMessageDEUser
    public List<Message> getAllMessagesByUserId(Long userId) {
        List<Message> messages = messageRepository.findBySenderId(userId);
        return messages;}

}
