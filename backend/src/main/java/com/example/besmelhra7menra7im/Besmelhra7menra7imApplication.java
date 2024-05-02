package com.example.besmelhra7menra7im;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class Besmelhra7menra7imApplication {

	public static void main(String[] args) {
		SpringApplication.run(Besmelhra7menra7imApplication.class, args);
	}

}
