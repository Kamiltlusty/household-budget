package pl.kamil.householdbudgetapi.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kamil.householdbudgetapi.domain.entities.Store;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByName(String name);
}
