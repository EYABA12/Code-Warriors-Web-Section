package com.example.besmelhra7menra7im.Controller;
import com.example.besmelhra7menra7im.Service.ValueService;
import com.example.besmelhra7menra7im.entities.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class ValueController {
    @Autowired

    private final ValueService valueService;
    public ValueController(ValueService valueService){
        this.valueService=valueService;
    }
    //1-postValue
    @PostMapping("/values")
    public ResponseEntity<Value> createValue(@RequestBody Value value) {
        Value newValue = valueService.createValue(value);
        return ResponseEntity.ok().body(newValue);
    }
    //2-getvalues
    @GetMapping("/values")
    public ResponseEntity<List<Value>> getAllValues() {
        List<Value> allValues = valueService.getALLValues();
        return ResponseEntity.ok().body(allValues);
    }
    //3-RemoveValue
    @DeleteMapping("values/{id}")
    public void deleteValue(@PathVariable("id") long id) {
        valueService.deleteValue(id);
    }





}
