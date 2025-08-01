package pl.kamil.householdbudgetapi.application;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.kamil.householdbudgetapi.application.exceptions.NotFoundException;
import pl.kamil.householdbudgetapi.domain.entities.Form;
import pl.kamil.householdbudgetapi.infrastructure.FormRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FormServiceTest {

    @Mock
    FormRepository formRepository;

    @InjectMocks
    FormService formService;

    private static final Long FORM_ID = 1L;
    private static final Long NULL_FORM_ID = null;
    private static Form minimalForm;

    @BeforeAll
    static void setFormWithMinimumRequestedValues() {
        minimalForm = Form.builder()
                .formId(FORM_ID)
                .date(LocalDate.of(2025, 10, 10))
                .buyerName("Kamil")
                .totalSum(BigDecimal.valueOf(123.55))
                .build();
    }

    @Test
    @DisplayName("Gets form id, invokes mocked repository method and should return form")
    public void givenFormId_whenFormExists_thenReturnFrom() {
        // given
        when(formRepository.findById(FORM_ID))
                .thenReturn(Optional.of(minimalForm));
        // when
        Form result = formService.getFormById(FORM_ID);
        // then
        assertEquals(minimalForm, result, "Returned form should be the same as the mocked one.");
        verify(formRepository, times(1)).findById(FORM_ID);
    }

    private static final String ILLEGAL_ARGUMENT_MSG = "Form id cannot be null";

    @Test
    @DisplayName("Gets null as form id, " +
            "invokes mocked repository method and " +
            "should return IllegalArgumentException(Form id cannot be null)")
    public void givenNull_thenReturnIllegalArgumentException() {
        // given, when, then
        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class,
                        () -> formService.getFormById(NULL_FORM_ID),
                        String.format("Should throw IllegalArgumentException(%s)", ILLEGAL_ARGUMENT_MSG));
        assertEquals(ILLEGAL_ARGUMENT_MSG, exception.getMessage());

        verify(formRepository, never()).findById(any());
    }

    private static final String NOT_FOUND_MSG = String.format("Form with ID: " + FORM_ID + " not found.");

    @Test
    @DisplayName("Gets form id, " +
            "invokes mocked repository method and " +
            "should return NotFoundException(Form with ID: 1 not found)")
    public void givenFormId_whenFormNotExists_thenReturnNotFoundException() {
        // given
        when(formRepository.findById(FORM_ID))
                .thenThrow(new NotFoundException(NOT_FOUND_MSG));
        // when, then
        NotFoundException notFoundException = assertThrows(NotFoundException.class, () -> formService.getFormById(FORM_ID));
        assertEquals(NOT_FOUND_MSG, notFoundException.getMessage());

        verify(formRepository, times(1)).findById(FORM_ID);
    }
}






