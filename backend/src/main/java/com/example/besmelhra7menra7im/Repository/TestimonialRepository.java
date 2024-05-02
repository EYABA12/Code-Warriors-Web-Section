package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.Question;
import com.example.besmelhra7menra7im.entities.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
}
