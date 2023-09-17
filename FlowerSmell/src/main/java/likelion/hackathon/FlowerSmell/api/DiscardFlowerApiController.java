package likelion.hackathon.FlowerSmell.api;

import jakarta.validation.Valid;
import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.DiscardFlower;
import likelion.hackathon.FlowerSmell.repository.DiscardFlowerRepository;
import likelion.hackathon.FlowerSmell.service.BusinessService;
import likelion.hackathon.FlowerSmell.service.DiscardFlowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class DiscardFlowerApiController {

    private final DiscardFlowerService discardFlowerService;

    private final BusinessService businessService;

    private final DiscardFlowerRepository discardFlowerRepository;

    @PostMapping("/api/saveDiscardFlower/{businessName}")
    @ResponseStatus(HttpStatus.OK)
    public int saveMember(@RequestBody DiscardFlower discardFlower, @PathVariable String businessName) {
        Business business = businessService.findByName(businessName);
        discardFlower.setDiscardFlowerBusiness(business);


        return discardFlowerService.register(discardFlower);
    }


    @GetMapping("/api/allDiscardFlowers")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscardFlower> members() {
        return discardFlowerService.findMembers();
    }


}
