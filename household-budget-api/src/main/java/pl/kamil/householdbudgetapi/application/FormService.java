package pl.kamil.householdbudgetapi.application;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.kamil.householdbudgetapi.application.exceptions.NotFoundException;
import pl.kamil.householdbudgetapi.domain.entities.Form;
import pl.kamil.householdbudgetapi.domain.entities.Store;
import pl.kamil.householdbudgetapi.infrastructure.FormRepository;
import pl.kamil.householdbudgetapi.infrastructure.StoreRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
@AllArgsConstructor
public class FormService {
    private final FormRepository formRepository;
    private final StoreRepository storeRepository;

    public Form getFormById(Long formId) {
        if (formId == null) throw new IllegalArgumentException("Form id cannot be null");

        return formRepository.findById(formId)
                .orElseThrow(() -> new NotFoundException("Form with ID: " + formId + " not found."));
    }

    public Page<Form> findFormsWithPaginationAndSorting(int pageNumber, int pageSize, String field) {
        return formRepository.findAll(PageRequest.of(pageNumber, pageSize)
                .withSort(Sort.by(Sort.Direction.DESC, field)));
    }

    public void save(Form form) {
        findOrCreate(form);



        formRepository.save(form);
    }

    private void findOrCreate(Form form) {
        Store store = form.getStore();
        if (store == null)
            throw new IllegalArgumentException("Store cannot be null");

        String storeName = store.getName();
        if (storeName == null || storeName.trim().isEmpty())
            throw new IllegalArgumentException("Store name cannot be null or empty");

        String normalizedStoreName = storeName.toLowerCase(Locale.ROOT).trim();

        Optional<Store> existingStore =
                storeRepository.findByName(normalizedStoreName);

        Store managedStore;
        if (existingStore.isPresent()) {
            managedStore = existingStore.get();
        } else {
            store.setStoreId(null);
            managedStore = storeRepository.save(store);
        }

        form.setStore(managedStore);
    }

    private Store generateStore(Random rand) {
        int nameNum = rand.nextInt(1, 8);
        String storeName = switch (nameNum) {
            case 1 -> "lidl";
            case 2 -> "biedronka";
            case 3 -> "żabka";
            case 4 -> "auchan";
            case 5 -> "carrefour";
            case 6 -> "putka";
            case 7 -> "dino";
            default -> throw new IllegalStateException("Unexpected value: " + nameNum);
        };
        return new Store(storeName);
    }

//    @Profile("dev")
//    @PostConstruct
//    public void populateForms() {
//        Random r = new Random();
//        List<Form> forms = IntStream.rangeClosed(1, 100)
//                .mapToObj(i -> new Form(
//                        generateDate(r),
//                        generateFormName(),
//                        BigDecimal.valueOf(r.nextDouble()),
//                        generateStore(r)
//                ))
//                .toList();
//        forms.forEach(this::save);
//    }

    public LocalDate generateDate(Random rand) {
        int year = 2000 + rand.nextInt(0, 26);
        int month = rand.nextInt(1, 12);
        int day = rand.nextInt(1, 28);
        return LocalDate.of(year, month, day);
    }

    public String generateFormName() {
        return LocalTime.now().getSecond() % 2 == 0 ? "Kamil" : "Weronika";
    }

}
