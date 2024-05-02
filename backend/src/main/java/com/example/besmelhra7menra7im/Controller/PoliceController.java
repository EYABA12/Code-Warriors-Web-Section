package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.PoliceRepositry;
import com.example.besmelhra7menra7im.entities.Faq;
import com.example.besmelhra7menra7im.entities.Police;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/")
public class PoliceController {
    @Autowired
    private PoliceRepositry policeRepositry;



    //1-getPolice
    @GetMapping("/polices")
    public Police getPolice() {
        List<Police> policeList = policeRepositry.findAll();
        if (!policeList.isEmpty()) {
          Police  hh=policeList.get(0);
            System.out.println("police is"+hh);
            return  hh;
        } else {
            // Gérer le cas où il n'y a pas d'objet Police dans la base de données
            return null; // Ou vous pouvez lever une exception ou renvoyer un message d'erreur
        }
    }
    //2-post police
    @PostMapping("/polices")
    public ResponseEntity<Police> createPolice(@RequestBody Police police) {
        Police savedPolice = policeRepositry.save(police);
        return ResponseEntity.ok().body(savedPolice);
    }


    //3-PATCH POLICE
    @PatchMapping("/polices/{id}")
    public ResponseEntity<Police> updatePolice(@PathVariable Long id, @RequestBody Police updatedPolice) {
        return policeRepositry.findById(id)
                .map(police -> {
                    police.setText(updatedPolice.getText());
                    Police savedPolice = policeRepositry.save(police);
                    return ResponseEntity.ok().body(savedPolice);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    //4 deletePolice
    @DeleteMapping("polices/{id}")
    public void deleteFaqs(@PathVariable("id") long id) {

        policeRepositry.deleteById(id);
    }
}

