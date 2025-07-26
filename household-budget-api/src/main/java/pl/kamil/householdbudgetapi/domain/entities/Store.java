package pl.kamil.householdbudgetapi.domain.entities;

import jakarta.persistence.*;
import lombok.*;

@With
@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @Column(unique = true)
    private String name;

    public Store(String name) {
        this.name = name;
    }
}
