package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.entities.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.besmelhra7menra7im.entities.User;
@Service
public class AuthService {

    private UserRepository userRepository;
        private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User authenticate(String email, String password) {
        // Recherchez l'utilisateur dans la base de données en fonction de l'email
        User user = userRepository.findByEmail(email);

        // Vérifiez si un utilisateur avec cet email a été trouvé
        if (user == null) {
            // L'utilisateur n'existe pas
            throw new RuntimeException("User not found");
        }

        // Vérifiez si le mot de passe fourni correspond au mot de passe stocké pour cet utilisateur
        if (!passwordEncoder.matches(password, user.getPassword())) {
            // Les mots de passe ne correspondent pas
            throw new RuntimeException("Incorrect password");
        }

        // Les informations d'identification sont correctes, renvoyez l'utilisateur authentifié
        return user;
    }
    public Long getUserIdByEmail(String email) {
        // Recherche de l'utilisateur dans la base de données en utilisant son email
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user.getId(); // Renvoyer l'ID de l'utilisateur si l'utilisateur est trouvé
        } else {
            // Gérer le cas où l'utilisateur n'est pas trouvé (peut-être renvoyer null ou -1 selon vos besoins)
            return null;
        }
    }
}
