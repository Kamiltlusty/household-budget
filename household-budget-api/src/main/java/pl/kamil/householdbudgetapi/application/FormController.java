package pl.kamil.householdbudgetapi.application;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.kamil.householdbudgetapi.domain.dtos.FormDTO;
import pl.kamil.householdbudgetapi.domain.entities.Form;

@CrossOrigin(origins = {
        "https://vermillion-begonia-7ad5c2.netlify.app",
        "http://localhost:8888"
})
@RestController
@RequiredArgsConstructor
public class FormController {
    private final FormService formService;
    private final FormMapper formMapper;

    @PostMapping(path = "/form", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
