package pl.kamil.householdbudgetapi.application;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.kamil.householdbudgetapi.domain.entities.Form;
import pl.kamil.householdbudgetapi.infrastructure.FormRepository;

@Service
@Transactional
@AllArgsConstructor
public class FormService {
    private final FormRepository formRepository;

    public void save(Form form) {
        formRepository.save(form);
    }
}
