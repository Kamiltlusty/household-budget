package pl.kamil.householdbudgetapi.application;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kamil.householdbudgetapi.domain.dtos.StoreDTO;

import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = {
        "https://vermillion-begonia-7ad5c2.netlify.app",
        "http://localhost:8888"
})
@RestController
@RequiredArgsConstructor
public class StoreController {
    private final StoreMapper storeMapper;
    private final StoreService storeService;

    @GetMapping(path = "/stores")
    public ResponseEntity<Set<StoreDTO>> getStores() {
        Set<StoreDTO> stores = storeService.findAll().stream()
                .map(storeMapper::toStoreDTO)
                .collect(Collectors.toSet());
        return ResponseEntity.ok().body(stores);
    }
}
