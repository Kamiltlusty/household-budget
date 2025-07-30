package pl.kamil.householdbudgetapi.domain.dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class FormDTO {
    private LocalDate date;
    private String buyerName;
    private StoreDTO store;
    private BigDecimal totalSum;
    private String receiptUrl;
    private Set<ProductDTO> products = new HashSet<>();
}
