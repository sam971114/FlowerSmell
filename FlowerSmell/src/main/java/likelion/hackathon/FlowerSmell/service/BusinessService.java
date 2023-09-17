package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.*;
import likelion.hackathon.FlowerSmell.repository.BusinessRepository;
import likelion.hackathon.FlowerSmell.repository.FlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BusinessService {

    private final FlowerRepository flowerRepository;
    private final BusinessRepository businessRepository;

    @Transactional
    public int join(Business business) {
        validateDuplicateMember(business);
        businessRepository.save(business);
        return business.getId();
    }

    private void validateDuplicateMember(Business business) {
        //EXCEPTION
        List<Business> findMembers = (List<Business>) businessRepository.findByUsername(business.getUsername());
        if(!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //회원 전체 조회
    public List<Business> findMembers() {
        return businessRepository.findAll();
    }

    public Business findOne(int memberId) {
        return businessRepository.findById(memberId).get();
    }

    public Business findByName(String username) {
        return businessRepository.findByUsername(username);
    }


    @Transactional
    public void update(int id, String name) {
        Business business = businessRepository.findById(id).get();
        business.setUsername(name);
    }






    public List<Business> findSubscribeMembers() {
        return businessRepository.findBySubscribeTrue();
    }

    public List<Flower> findAllFlowers() {
        return flowerRepository.findAll();
    }

}
