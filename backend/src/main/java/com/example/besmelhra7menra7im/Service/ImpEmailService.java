package com.example.besmelhra7menra7im.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.mail.javamail.JavaMailSender;

import java.util.Objects;

@Service
public class ImpEmailService implements EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public String sendMail(MultipartFile[] files, String[] to,String subject, String body) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            if(files != null) {
                for (MultipartFile multipartFile : files) {
                    mimeMessageHelper.addAttachment(
                            Objects.requireNonNull(multipartFile.getOriginalFilename()),
                            new ByteArrayResource(multipartFile.getBytes()));
                }
            }


            javaMailSender.send(mimeMessage);

            return "mail send";

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }
}
