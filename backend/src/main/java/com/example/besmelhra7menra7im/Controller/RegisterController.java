package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.dto.QuestionDto;
import com.example.besmelhra7menra7im.dto.UserDto;
import com.example.besmelhra7menra7im.dto.emailSubscription;
import com.example.besmelhra7menra7im.entities.Categorie;
import com.example.besmelhra7menra7im.entities.Police;
import com.example.besmelhra7menra7im.entities.Question;
import com.example.besmelhra7menra7im.entities.User;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/")
public class RegisterController {
    @Autowired

    private final UserService service;
    private final UserRepository userRepository;

    public RegisterController(UserService service,UserRepository userRepository) {
        this.service = service;
        this.userRepository=userRepository;
    }
    //1-postUser
    @PostMapping("/users")
    public UserDto register(@RequestBody UserDto userDto) {
        User user=new User();
        user.setFirstName(userDto.firstName);
        user.setLastName(userDto.lastName);
        user.setImage(userDto.image);
        user.setPhoneNumber(userDto.phoneNumber);
        user.setPlace(userDto.place);
        user.setRegistrationDate(userDto.date);
        user.setPassword(userDto.password);
        user.setConfirmPassword(userDto.confirmPassword);
        user.setClub(userDto.club);
        user.setWork(userDto.work);
        user.setUniversity(userDto.university);
        user.setEmail(userDto.email);
        user.setUserName(userDto.userName);
        user.setRole("USER"); // Set default role for users

        service.registerUser(user);
        return userDto;
    }
    //1-getAllUser
    @GetMapping("/users")
    public List<UserDto> getAllUser() {
        List<User> users = service.getAllUsers();
        // Mapper les articles en DTOs
        List<UserDto> userDtos = users.stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
        return userDtos;
    }

    //3-patchUser
    @PatchMapping("/users/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDtoUpdate) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setClub(userDtoUpdate.club);
                    user.setWork(userDtoUpdate.work);
                    user.setUniversity(userDtoUpdate.university);
                    user.setPlace(userDtoUpdate.place);
                    user.setImage(userDtoUpdate.image);
                    user.setUserName(userDtoUpdate.userName);
                    user.setEmail(userDtoUpdate.email);
                    user.setPhoneNumber(userDtoUpdate.phoneNumber);
                    user.setPassword(userDtoUpdate.password);
                    user.setConfirmPassword(userDtoUpdate.confirmPassword);
                    user.setLastName(userDtoUpdate.lastName);
                    user.setFirstName(userDtoUpdate.firstName);
                    User savedUser = userRepository.save(user);
                    return ResponseEntity.ok().body(new UserDto(savedUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }



    //modifier user selon paramtre emailSubscription que tu le donne
        @PatchMapping("/users/email/{id}")
        public UserDto updateUser(@PathVariable Long id, @RequestBody emailSubscription request) {
            User updatedUser = service.UpdateEmailSubscriptionUser(id, request.emailSubscription);
            UserDto user=new UserDto(updatedUser);

            // Vérifier si une question est fournie dans la demande

            return user;
        }


    //obtient 4 premier utlisateur
        @GetMapping("/users/four")
        public List<UserDto> getFirstFourUsers(@RequestParam(defaultValue = "4") int limit) {
            List<User> allUsers = service.getAllUsers();
            List<User> firstFourUsers = allUsers.subList(0, Math.min(limit, allUsers.size()));

            // Mapper les utilisateurs en objets UserDto
            List<UserDto> userDtos = firstFourUsers.stream()
                    .map(UserDto::new) // Utilise le constructeur UserDto(User user)
                    .collect(Collectors.toList());

            return userDtos;
        }


    //delete un user
    @DeleteMapping("/users/remove/{id}")
    public void deleteUser(@PathVariable Long id) {
        // Récupérer l'utilisateur à supprimer
        User userToDelete = service.getUser(id);

        // Vérifier si l'utilisateur existe
        if (userToDelete != null) {
            // Supprimer l'utilisateur
            service.deleteUser(id);
        } else {
            // Gérer le cas où l'utilisateur n'existe pas
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + id);
        }
    }


    //methode pour obtenir un user a partir de son id
    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id) {
        // Retrieve the user from the service
        User user = service.getUser(id);

        // Check if the user exists
        if (user != null) {
            // Create a UserDto object from the retrieved user
            UserDto userDto = new UserDto(user);

            // Return the UserDto object with a 200 OK status
            return ResponseEntity.ok(userDto);
        } else {
            // Handle the case where the user does not exist with a 404 Not Found status
            return ResponseEntity.notFound().build();
        }
    }


}