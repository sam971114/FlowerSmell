package likelion.hackathon.FlowerSmell.api;


import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.service.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")

@RestController
@RequiredArgsConstructor
public class MainPageApiController {

    private final BusinessService businessService;

    @GetMapping("/api/MainPage/allBusinesses")
    public List<Business> members() {
        return businessService.findMembers();
    }


    @GetMapping("/api/MainPage/SubBusinesses")
    public List<Business> subMembers() {
        return businessService.findSubscribeMembers();
    }



}
