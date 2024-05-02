package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.TipsRepository;
import com.example.besmelhra7menra7im.entities.Tips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;




    @RestController
    @RequestMapping("/api/tips")
    public class TipController {

        private final TipsRepository tipsRepository;

        @Autowired
        public TipController(TipsRepository tipsRepository) {
            this.tipsRepository = tipsRepository;
        }

        // Endpoint pour récupérer toutes les astuces
        @GetMapping
        public ResponseEntity<List<Tips>> getAllTips() {
            List<Tips> tips = tipsRepository.findAll();
            return new ResponseEntity<>(tips, HttpStatus.OK);
        }

        // Endpoint pour récupérer une astuce par son ID
        @GetMapping("/{id}")
        public ResponseEntity<Tips> getTipById(@PathVariable("id") Long id) {
            Optional<Tips> tipOptional = tipsRepository.findById(id);
            return tipOptional.map(tip -> new ResponseEntity<>(tip, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        // Endpoint pour créer une nouvelle astuce
        @PostMapping
        public ResponseEntity<Tips> createTip(@RequestBody Tips tip) {
            Tips savedTip = tipsRepository.save(tip);
            return new ResponseEntity<>(savedTip, HttpStatus.CREATED);
        }

        // Endpoint pour mettre à jour une astuce existante
        @PutMapping("/{id}")
        public ResponseEntity<Tips> updateTip(@PathVariable("id") Long id, @RequestBody Tips tip) {
            if (!tipsRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            tip.setId(id);
            Tips updatedTip = tipsRepository.save(tip);
            return new ResponseEntity<>(updatedTip, HttpStatus.OK);
        }

        // Endpoint pour supprimer une astuce par son ID
        @DeleteMapping("/{id}")
        public ResponseEntity<HttpStatus> deleteTip(@PathVariable("id") Long id) {
            try {
                tipsRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

