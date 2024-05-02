package com.example.besmelhra7menra7im.Controller;
import com.example.besmelhra7menra7im.Repository.FilteredWordRepository;
import com.example.besmelhra7menra7im.entities.FilteredWord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filtered-words")
public class FilteredWordController {
    @Autowired
    private FilteredWordRepository filteredWordRepository;

    @GetMapping
    public List<FilteredWord> getAllFilteredWords() {
        return filteredWordRepository.findAll();
    }

    @PostMapping
    public FilteredWord addFilteredWord(@RequestBody FilteredWord filteredWord) {
        return filteredWordRepository.save(filteredWord);
    }

    @DeleteMapping("/{id}")
    public void removeFilteredWord(@PathVariable Long id) {
        filteredWordRepository.deleteById(id);
    }
}