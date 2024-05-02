package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.TouchRepository;
import com.example.besmelhra7menra7im.entities.Contact;
import com.example.besmelhra7menra7im.entities.Touch;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TouchService {

    private final TouchRepository touchRepository;
    public TouchService(TouchRepository touchRepository){
        this.touchRepository=touchRepository;

    }
    //1-methode de get tous les contact
    public List<Touch> getAllContact() {
        return touchRepository.findAll();
    }

    //1-methode de post un contcat

    public Touch createContact(Touch touch) {

        // Enregistrer l'contact dans la base de données
        return touchRepository.save(touch); // Retourner le faq enregistré
    }
}
