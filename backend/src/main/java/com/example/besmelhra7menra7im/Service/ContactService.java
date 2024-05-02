package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.ContactRepository;
import com.example.besmelhra7menra7im.Repository.FaqRepository;
import com.example.besmelhra7menra7im.entities.Contact;
import com.example.besmelhra7menra7im.entities.Faq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService( ContactRepository contactRepository) {
        this.contactRepository =contactRepository ;
    }

    //1-methode de get tous les contact
    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }

    //1-methode de post un contcat

    public Contact createContact(Contact contact) {

        // Enregistrer l'contact dans la base de données
        return contactRepository.save(contact); // Retourner le faq enregistré
    }
}
