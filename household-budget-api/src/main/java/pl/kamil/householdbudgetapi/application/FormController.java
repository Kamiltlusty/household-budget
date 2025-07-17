package pl.kamil.householdbudgetapi.application;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FormController {

    @CrossOrigin(origins = "https://vermillion-begonia-7ad5c2.netlify.app")
    @PostMapping(path = "/form", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> save(@RequestPart("form") String formJSON, @RequestPart("receipt-img") MultipartFile receiptImg) {
        try {
            System.out.println("Docieram");
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("error");
        }
    }
}
