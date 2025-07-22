package pl.kamil.householdbudgetapi.application;

import org.springframework.stereotype.Component;
import pl.kamil.householdbudgetapi.domain.dtos.FormDTO;
import pl.kamil.householdbudgetapi.domain.entities.Form;
import pl.kamil.householdbudgetapi.domain.entities.Product;
import pl.kamil.householdbudgetapi.domain.entities.Store;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class FormMapper {
    public Form toForm(FormDTO formDTO) {
        return Form.builder()
                .date(formDTO.getDate())
                .buyerName(formDTO.getBuyerName())
                .store(new Store(formDTO.getStore().getName()))
                .products(new HashSet<>(formDTO.getProducts().stream()
                        .map(p -> new Product(p.getName()))
                        .collect(Collectors.toSet())))
                .totalSum(formDTO.getTotalSum())
                .build();
    }
}
