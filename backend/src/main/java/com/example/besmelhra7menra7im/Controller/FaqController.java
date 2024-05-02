package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.FaqService;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.entities.Faq;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class FaqController {
    @Autowired

    private final FaqService faqService;
public FaqController(FaqService faqService){
    this.faqService=faqService;
}
    //1-postfaq
            @PostMapping("/faqs")
            public ResponseEntity<Faq> CreateFaq(@RequestBody Faq faq) {
                return ResponseEntity.ok(faqService.createFaq(faq));
            }
    //2-getfaq
        @GetMapping("/faqs")
        public ResponseEntity<List<Faq>> getAllFaqs() {
            List<Faq> AllUsers = faqService.getALLFaqs();
            return ResponseEntity.ok().body(AllUsers);
        }
    //3-RemoveFaq
        @DeleteMapping("faqs/{id}")
        public void deleteFaqs(@PathVariable("id") long id) {
            faqService.deleteFaq(id);
        }
}
