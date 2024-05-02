package com.example.besmelhra7menra7im.Controller;

import com.example.besmelhra7menra7im.Service.AuthService;
import com.example.besmelhra7menra7im.Service.UserService;
import com.example.besmelhra7menra7im.dto.UserDto;
import com.example.besmelhra7menra7im.entities.Login;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/users")
public class LoginController {
    @Autowired
    private AuthService authService;
    private UserService userService;

    public LoginController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody Login authRequest) {

        // Les informations d'identification n'appartiennent pas à l'administrateur, vérifiez-les pour un utilisateur régulier
        User user = authService.authenticate(authRequest.getEmail(), authRequest.getPassword());
        if (user != null) {
            // Les informations d'identification appartiennent à un utilisateur régulier
            // Récupération de l'ID de l'utilisateur
            Long userId = authService.getUserIdByEmail(authRequest.getEmail());
            String userRole = user.getRole(); // Retrieve user role

            // Construire la réponse pour l'utilisateur régulier
            Map<String, Object> response = generateUserResponse(userId, userRole);
            return ResponseEntity.ok(response);
        } else {
            // L'authentification a échoué
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    private Map<String, Object> generateUserResponse(Long userId, String userRole) {
        String redirectUrl = "/user/dashboard";

        if(Objects.equals(userRole, "ADMIN"))
            redirectUrl = "/admin/dashboard";

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User Login Success");
        response.put("userId", userId);
        response.put("role", userRole); // Include user role in response
        response.put("redirectUrl", redirectUrl); // Rediriger l'utilisateur régulier vers son tableau de bord
        return response;
    }

    @GetMapping("/subscribed")
    public List<UserDto> getSubscribedEmployees() {
        List<User> subscribedEmployees = userService.getSubscribedUsers();
        List<UserDto> userDtos = subscribedEmployees.stream()
                .map(UserDto::new) // Utilise le constructeur UserDto(User user)
                .collect(Collectors.toList());

        return userDtos;
    }



    @GetMapping("/accounts")
    public ResponseEntity<List<User>> getFirstFourUsers(@RequestParam(defaultValue = "4") int limit) {
        List<User> allUsers = userService.getAllUsers();
        List<User> firstFourUsers = allUsers.subList(0, Math.min(limit, allUsers.size()));
        return ResponseEntity.ok().body(firstFourUsers);
    }

}


