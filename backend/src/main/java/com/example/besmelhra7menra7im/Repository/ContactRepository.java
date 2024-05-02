package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Contact;
import com.example.besmelhra7menra7im.entities.email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
