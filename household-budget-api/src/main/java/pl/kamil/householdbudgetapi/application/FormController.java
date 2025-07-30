package pl.kamil.householdbudgetapi.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.kamil.householdbudgetapi.domain.dtos.FormDTO;
import pl.kamil.householdbudgetapi.domain.dtos.HistoryDataDTO;
import pl.kamil.householdbudgetapi.domain.entities.Form;

import java.util.List;

@CrossOrigin(origins = {
        "https://vermillion-begonia-7ad5c2.netlify.app",
        "http://localhost:8888"
})
@RestController
@RequestMapping("/form")
@RequiredArgsConstructor
public class FormController {
    private final FormService formService;
    private final FormMapper formMapper;

    @GetMapping(path = "/history-form/{id}")
    ResponseEntity<FormDTO> fetchSelectedFormData(
            @PathVariable(name = "id") Long formId
    ) {
        Form form = formService.getFormById(formId);
        FormDTO formDTO = formMapper.toFormDTO(form);

        return ResponseEntity
                .ok()
                .body(formDTO);
    }

    @GetMapping(path = "/history-data")
    ResponseEntity<PagedResponse<HistoryDataDTO>> getHistoryData(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size,
            @RequestParam(defaultValue = "date") String field
    ) {
        Page<Form> formsPage = formService
                .findFormsWithPaginationAndSorting(page, size, field);

        List<HistoryDataDTO> forms = formsPage.stream()
                .map(formMapper::toHistoryDataDTO)
                .toList();

        PagedResponse<HistoryDataDTO> response = new PagedResponse<>(
                forms,
                formsPage.getNumber(),
                formsPage.getSize(),
                formsPage.getTotalElements(),
                formsPage.getTotalPages(),
                formsPage.isLast()
        );

        return ResponseEntity
                .ok()
                .body(response);
    }

    @PostMapping(path = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> save(
            @RequestPart("form") FormDTO formDto,
            @RequestPart(name = "receipt-img", required = false) MultipartFile receiptImg
    ) {
        try {
            Form form = formMapper.toForm(formDto);
            formService.save(form);
            return ResponseEntity.ok().body("ok");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("error");
        }
    }
}
