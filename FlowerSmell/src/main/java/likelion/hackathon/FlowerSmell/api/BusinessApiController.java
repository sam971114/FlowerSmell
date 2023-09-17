package likelion.hackathon.FlowerSmell.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.Flower;
import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.repository.FlowerRepository;
import likelion.hackathon.FlowerSmell.service.BusinessService;
import likelion.hackathon.FlowerSmell.service.FlowerService;
import likelion.hackathon.FlowerSmell.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;


@RestController
@RequiredArgsConstructor
public class BusinessApiController {

    private final BusinessService businessService;

    private final FlowerService flowerService;

    private final FlowerRepository flowerRepository;

    @GetMapping("/api/allBusinesses")
    @ResponseStatus(HttpStatus.OK)
    public List<Business> members() {
        return businessService.findMembers();
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T date;
    }

    @Data
    @AllArgsConstructor
    static class MemberDto {
        private String name;
    }

    @PostMapping("/api/saveBusiness")
    @ResponseStatus(HttpStatus.OK)
    public UserApiController.CreateUserResponse saveMember(@RequestBody @Valid Business business) {
        int id = businessService.join(business);
        return new UserApiController.CreateUserResponse(id);
    }

    @PutMapping("/api/findOneBusiness/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserApiController.UpdateUserResponse updateMemberV2(
            @PathVariable("id") int id,
            @RequestBody @Valid UserApiController.UpdateMemberRequest request) {

        businessService.update(id, request.getName());
        Business findBusiness = businessService.findOne(id);
        return new UserApiController.UpdateUserResponse(findBusiness.getId(), findBusiness.getUsername());
    }


    //요거 다시 설정

    @GetMapping("/api/business/AllFlower/{businessName}")
    @ResponseStatus(HttpStatus.OK)
    public List<Flower> AllBusinessFlowers(@PathVariable String businessName) {
        Business business = businessService.findByName(businessName);
        return flowerRepository.findAllByFlowerBusiness_id(business.getId());

    }


    @GetMapping("/api/business/realAllFlower")
    @ResponseStatus(HttpStatus.OK)
    public List<Flower> realAllFlowers() {
        List<Flower> all = flowerRepository.findAll();
        return all;
    }

    @GetMapping("/api/business/searchFlower/{flower_id}")
    @ResponseStatus(HttpStatus.OK)
    public List<String> searchBusiness(@PathVariable int flower_id) {
        Flower temp_flower = flowerRepository.findById(flower_id).get();
        Business business = temp_flower.getFlowerBusiness();

        List<String> business_context = new ArrayList<>();


        Boolean subscribe = business.getSubscribe();
        String sub = String.valueOf(subscribe);
        String id_st = String.valueOf(business.getId());

        business_context.add(id_st);
        business_context.add(business.getAddress());
        business_context.add(business.getPhoneNumber());
        business_context.add(business.getUsername());
        business_context.add(sub);

        return business_context;
    }

    @PostMapping("/api/business/RegisterFlower/{businessName}")
    @ResponseStatus(HttpStatus.OK)
    public void RegisterFlower(@RequestBody Flower flower, @PathVariable String businessName) {
        Business business = businessService.findByName(businessName);
        flower.setFlowerBusiness(business);
        flowerRepository.save(flower);
    }

    @GetMapping("/api/business/searchBusiness")
    @ResponseStatus(HttpStatus.OK)
    public List<Flower> searchFlowers(@PathVariable String name) {
        List<Flower> all = flowerRepository.findAllByName(name);
        return all;
    }

    @Data
    static class UpdateMemberRequest {
        private String name;
    }

    @Data
    @AllArgsConstructor
    static class UpdateMemberResponse {
        private int id;
        private String name;
    }

    @Data
    static class CreateMemberRequest {
        @NotEmpty
        private String name;
    }

    @Data
    static class CreateMemberResponse {
        private int id;

        public CreateMemberResponse(int id) {
            this.id = id;
        }
    }

    @Getter
    @Data
    static class FlowerDto {
        private int flowerId;
        private String name;

        private int size;

        private int price;

        private String engName;

        private String message;

        private Business business;


        public FlowerDto(Flower flower) {
            flowerId = flower.getId();
            name = flower.getName();
            size = flower.getSize();
            price = flower.getPrice();
            engName = flower.getEngName();
            message = flower.getMessage();
            business = flower.getFlowerBusiness();
        }
    }



}


