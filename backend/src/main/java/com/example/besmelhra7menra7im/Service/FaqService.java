package com.example.besmelhra7menra7im.Service;

import com.example.besmelhra7menra7im.Repository.FaqRepository;
import com.example.besmelhra7menra7im.Repository.UserRepository;
import com.example.besmelhra7menra7im.entities.Faq;
import com.example.besmelhra7menra7im.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {
    private final FaqRepository faqRepository;

    @Autowired
    public FaqService(FaqRepository faqRepository) {
        this.faqRepository =faqRepository ;
    }
    //1-methode de get tous les faq
            public List<Faq> getALLFaqs() {
                return faqRepository.findAll();
            }
    //2-methode de post un faq

            public Faq createFaq(Faq faq) {
                // Vérifier si l'Faq existe déjà
                if (faqRepository.existsById(faq.getId())) {
                    // Si Faq existe déjà, une exception est levée
                    throw new RuntimeException("faq already exists");
                }
                // Enregistrer l'faq dans la base de données
                return faqRepository.save(faq); // Retourner le faq enregistré
            }

    //3-mothode delete un faq
            public void deleteFaq(Long id){
                    if(faqRepository.existsById(id)){
                        faqRepository.deleteById(id);
                    }
                    else{
                                throw new IllegalStateException(
                                       " Faq with id" + id + "does not exist"
                                );
                        }
            }





}
