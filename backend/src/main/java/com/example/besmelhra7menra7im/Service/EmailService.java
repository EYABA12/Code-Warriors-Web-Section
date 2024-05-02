package com.example.besmelhra7menra7im.Service;

import org.springframework.web.multipart.MultipartFile;

public interface EmailService {
    String sendMail(MultipartFile[] files, String[] to, String subject, String body);
}
