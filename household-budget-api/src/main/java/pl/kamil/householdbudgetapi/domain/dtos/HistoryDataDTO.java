package pl.kamil.householdbudgetapi.domain.dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class HistoryDataDTO {
    private LocalDate date;
    private String buyerName;
    private BigDecimal totalSum;
}
