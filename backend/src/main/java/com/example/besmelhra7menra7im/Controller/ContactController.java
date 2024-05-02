package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.ContactService;
import com.example.besmelhra7menra7im.Service.FaqService;
import com.example.besmelhra7menra7im.entities.Contact;
import com.example.besmelhra7menra7im.entities.Faq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/")

public class ContactController {
    @Autowired

    private final ContactService contactService;
    public ContactController(ContactService contactService){
        this.contactService=contactService;
    }


    //1-postfaq
    @PostMapping("/contacts")
    public ResponseEntity<Contact> CreateFaq(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.createContact(contact));
    }
    //2-getContact
    //2-getfaq
    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getAllContact() {
        List<Contact> AllContact = contactService.getAllContact();
        return ResponseEntity.ok().body(AllContact);
    }



}
