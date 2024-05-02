package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.ValueRepository;
import com.example.besmelhra7menra7im.entities.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValueService {
    private final ValueRepository valueRepository;

    @Autowired
    public ValueService(ValueRepository valueRepository) {
        this.valueRepository =valueRepository ;
    }
    //1-methode de get tous les valeur
    public List<Value> getALLValues() {
        return valueRepository.findAll();
    }
    //2-methode de post un value

    public Value createValue(Value value) {
        // Vérifier si value existe déjà
        if (valueRepository.existsById(value.getId())) {
            // Si Faq existe déjà, une exception est levée
            throw new RuntimeException("value already exists");
        }
        // Enregistrer l'value dans la base de données
        return valueRepository.save(value); // Retourner le faq enregistré
    }
    //3-mothode delete un value
    public void deleteValue(Long id){
        if(valueRepository.existsById(id)){
            valueRepository.deleteById(id);
        }
        else{
            throw new IllegalStateException(
                    " Value with id" + id + "does not exist"
            );
        }
    }

}

