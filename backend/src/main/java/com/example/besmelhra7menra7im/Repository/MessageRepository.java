package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);

}
