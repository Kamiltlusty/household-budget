package pl.kamil.householdbudgetapi.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.kamil.householdbudgetapi.domain.entities.Store;
import pl.kamil.householdbudgetapi.infrastructure.StoreRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;

    public List<Store> findAll() {
        return storeRepository.findAll();
    }

}
