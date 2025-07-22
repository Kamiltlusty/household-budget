package pl.kamil.householdbudgetapi.application;

import org.springframework.stereotype.Component;
import pl.kamil.householdbudgetapi.domain.dtos.StoreDTO;
import pl.kamil.householdbudgetapi.domain.entities.Store;

@Component
public class StoreMapper {
    public StoreDTO toStoreDTO(Store store) {
        return StoreDTO.builder()
                .name(store.getName())
                .build();
    }
}
