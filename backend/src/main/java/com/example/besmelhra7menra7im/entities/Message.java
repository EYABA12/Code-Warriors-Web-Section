package com.example.besmelhra7menra7im.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;
@Entity

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @JdbcTypeCode(SqlTypes.JSON)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;




    @JdbcTypeCode(SqlTypes.JSON)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;


    private Date date=new Date();
private String  content;


    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }









    public String getContent()
    {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    public Long getIdReceiver(){
        return receiver.getId();
    }
    public Long getIdSender(){
        return sender.getId();
    }

}
