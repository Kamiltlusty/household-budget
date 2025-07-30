package pl.kamil.householdbudgetapi.application;

import org.springframework.stereotype.Component;
import pl.kamil.householdbudgetapi.domain.dtos.FormDTO;
import pl.kamil.householdbudgetapi.domain.dtos.HistoryDataDTO;
import pl.kamil.householdbudgetapi.domain.dtos.ProductDTO;
import pl.kamil.householdbudgetapi.domain.dtos.StoreDTO;
import pl.kamil.householdbudgetapi.domain.entities.Form;
import pl.kamil.householdbudgetapi.domain.entities.Product;
import pl.kamil.householdbudgetapi.domain.entities.Store;

import javax.swing.text.html.Option;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FormMapper {
    public Form toForm(FormDTO formDTO) {
        return Form.builder()
                .date(formDTO.getDate())
                .buyerName(formDTO.getBuyerName())
                .store(new Store(formDTO.getStore().getName()))
                .products(
                        formDTO.getProducts() != null
                                ? new HashSet<>(formDTO.getProducts().stream()
                                .map(p -> new Product(p.getName()))
                                .collect(Collectors.toSet()))
                                : new HashSet<>()
                )
                .totalSum(formDTO.getTotalSum())
                .build();
    }

    public HistoryDataDTO toHistoryDataDTO(Form form) {
        return HistoryDataDTO.builder()
                .formId(form.getFormId())
                .date(form.getDate())
                .buyerName(form.getBuyerName())
                .totalSum(form.getTotalSum())
                .build();
    }

    public FormDTO toFormDTO(Form form) {
        return FormDTO.builder()
                .date(form.getDate())
                .buyerName(form.getBuyerName())
                .store(new StoreDTO(form.getStore().getName()))
                .products(form.getProducts().stream()
                        .map(a -> new ProductDTO(a.getName()))
                        .collect(Collectors.toSet()))
                .receiptUrl(form.getReceiptUrl())
                .totalSum(form.getTotalSum())
                .build();
    }
}
