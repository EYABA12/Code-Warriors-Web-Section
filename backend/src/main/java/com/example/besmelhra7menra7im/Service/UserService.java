package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.dto.UserDto;
import com.example.besmelhra7menra7im.entities.User;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User registerUser(User user) {
        // Vérifier si l'utilisateur existe déjà
        if (userRepository.existsByUserName(user.getUserName())) {
            // Si l'utilisateur existe déjà, une exception est levée
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByemail(user.getEmail())) {
            // Si l'email existe déjà, une exception est levée
            throw new RuntimeException("email already exists");
        }

        // Vérifier si le mot de passe correspond à la confirmation de mot de passe
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            // Si les mots de passe ne correspondent pas, une exception est levée
            throw new RuntimeException("Password and Confirm Password do not match");
        }

        // Encoder le mot de passe avant de l'enregistrer
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);


        // Encoder le mot de passe avant de l'enregistrer
        String encodedConfirmPassword = passwordEncoder.encode(user.getConfirmPassword());
        user.setConfirmPassword(encodedConfirmPassword);

        // Enregistrer l'utilisateur dans la base de données
        return userRepository.save(user); // Retourner l'utilisateur enregistré
    }

//updatEmail
    public User UpdateEmailSubscriptionUser(Long userId, String emailSubscription) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setEmailSubscription(emailSubscription);
            return userRepository.save(user);
        } else {
            return null;
        }
    }
    //updatequestion



    public List<User> getSubscribedUsers() {
        return userRepository.findByEmailSubscriptionIsNotNull();
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    public User updateUser(User updatedUser) {
        try {
            // Vérifier si l'utilisateur existe dans la base de données
            boolean exists = userRepository.existsById(updatedUser.getId());

            if (exists) {
                // Vérifier si les mots de passe correspondent
                if (!updatedUser.getPassword().equals(updatedUser.getConfirmPassword())) {
                    throw new RuntimeException("Password and Confirm Password do not match");
                }

                // Encoder le mot de passe avant de l'enregistrer
                String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
                updatedUser.setPassword(encodedPassword);
                updatedUser.setConfirmPassword(encodedPassword); // Mettre à jour le mot de passe confirmé

                return userRepository.save(updatedUser);
            } else {
                // Si l'utilisateur n'existe pas, une exception est levée
                throw new IllegalStateException("L'utilisateur avec l'identifiant " + updatedUser.getId() + " n'existe pas");
            }

        } catch (Exception e) {
            // Gérer les exceptions appropriées ici
            // Par exemple, vous pouvez logger l'erreur ou la relancer
            throw new RuntimeException("Une erreur s'est produite lors de la mise à jour de l'utilisateur", e);
        }
    }

    public boolean existsById(Long userId) {
        return userRepository.existsById(userId);
    }
    public User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        // Renvoie l'utilisateur trouvé s'il existe, sinon renvoie null
        return userOptional.orElse(null);    }




}
