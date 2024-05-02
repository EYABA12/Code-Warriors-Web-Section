package com.example.besmelhra7menra7im.dto;

import com.example.besmelhra7menra7im.entities.Message;

import java.util.Date;

public class MessageDto {

    public Long id;
    public Long senderId;
    public Long receiverId;
    public String content;
    public Date date;
    public MessageDto() {
    }

    public MessageDto(Message message) {
        this.id=message.getId();
        this.content=message.getContent();
        this.date=message.getDate();
        this.receiverId=message.getIdReceiver();
        this.senderId=message.getIdSender();
    }
}
