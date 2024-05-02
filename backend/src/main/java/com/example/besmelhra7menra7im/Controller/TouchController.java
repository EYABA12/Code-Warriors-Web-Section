package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.ContactService;
import com.example.besmelhra7menra7im.Service.TouchService;
import com.example.besmelhra7menra7im.entities.Contact;
import com.example.besmelhra7menra7im.entities.Touch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class TouchController {

        @Autowired

        private final TouchService touchService;
        public TouchController(TouchService touchService){
            this.touchService=touchService;
        }

    //1-postgetIn touch
    @PostMapping("/touches")
    public ResponseEntity<Touch> CreategetInTouch(@RequestBody Touch contact) {
        return ResponseEntity.ok(touchService.createContact(contact));
    }
    //2-getTouches

    @GetMapping("/touches")
    public ResponseEntity<List<Touch>> getAllContact() {
        List<Touch> AllContact = touchService.getAllContact();
        return ResponseEntity.ok().body(AllContact);
    }



}


