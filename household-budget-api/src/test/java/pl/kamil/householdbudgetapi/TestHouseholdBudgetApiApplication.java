package pl.kamil.householdbudgetapi;

import org.springframework.boot.SpringApplication;

public class TestHouseholdBudgetApiApplication {

    public static void main(String[] args) {
        SpringApplication.from(HouseholdBudgetApiApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
