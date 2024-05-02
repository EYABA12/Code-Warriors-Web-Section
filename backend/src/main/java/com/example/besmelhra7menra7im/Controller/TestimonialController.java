package com.example.besmelhra7menra7im.Controller;


import com.example.besmelhra7menra7im.Service.TestimonialService;
import com.example.besmelhra7menra7im.entities.Testimonial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    @Autowired
    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        List<Testimonial> testimonials = testimonialService.getAllTestimonials();
        return new ResponseEntity<>(testimonials, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Testimonial> addTestimonial(@RequestBody Testimonial testimonial) {
        Testimonial savedTestimonial = testimonialService.addTestimonial(testimonial);
        return new ResponseEntity<>(savedTestimonial, HttpStatus.CREATED);
    }

    // Ajoutez d'autres méthodes pour la mise à jour, la suppression, etc.
}