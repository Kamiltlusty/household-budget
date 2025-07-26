package pl.kamil.householdbudgetapi.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@With
@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;
    private LocalDate date;
    private String buyerName;
    private String receiptUrl;
    private BigDecimal totalSum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_form",
            joinColumns = @JoinColumn(name = "form_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products = new HashSet<>();

    public Form(LocalDate date, String buyerName, BigDecimal totalSum, Store store) {
        this.date = date;
        this.buyerName = buyerName;
        this.totalSum = totalSum;
        this.store = store;
    }
    public Form(LocalDate date, String buyerName, String receiptUrl, BigDecimal totalSum, Store store) {
        this.date = date;
        this.buyerName = buyerName;
        this.receiptUrl = receiptUrl;
        this.totalSum = totalSum;
        this.store = store;
    }
}
