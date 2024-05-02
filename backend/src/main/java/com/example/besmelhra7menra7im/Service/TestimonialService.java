package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.TestimonialRepository;
import com.example.besmelhra7menra7im.entities.Testimonial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
    public class TestimonialService {

        private final TestimonialRepository testimonialRepository;

        @Autowired
        public TestimonialService(TestimonialRepository testimonialRepository) {
            this.testimonialRepository = testimonialRepository;
        }

        public List<Testimonial> getAllTestimonials() {
            return testimonialRepository.findAll();
        }

        public Testimonial addTestimonial(Testimonial testimonial) {
            return testimonialRepository.save(testimonial);
        }

        // Ajoutez d'autres méthodes pour la mise à jour, la suppression, etc.
    }
