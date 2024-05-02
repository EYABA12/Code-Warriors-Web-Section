package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.EmailService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController

    @RequestMapping("/api/mail")
    public class EmailController {
        private EmailService emailService;

        public EmailController(EmailService emailService) {
            this.emailService = emailService;
        }

        @PostMapping("/send")
        public String sendMail(@RequestParam(value = "file", required = false) MultipartFile[] file, String[] to, String subject, String body) {
            return emailService.sendMail(file, to, subject, body);
        }
}