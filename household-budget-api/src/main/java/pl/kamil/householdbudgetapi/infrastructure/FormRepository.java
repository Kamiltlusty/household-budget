package pl.kamil.householdbudgetapi.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kamil.householdbudgetapi.domain.entities.Form;

public interface FormRepository extends JpaRepository<Form, Long> {

}
