package com.example.besmelhra7menra7im.Repository;

import com.example.besmelhra7menra7im.entities.email;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.besmelhra7menra7im.entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserName(String userName);
boolean existsByemail(String email);
    User findByEmail(String email);
    List<User> findByEmailSubscriptionIsNotNull();

}
