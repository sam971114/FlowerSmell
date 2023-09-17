package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.Flower;
import likelion.hackathon.FlowerSmell.repository.BusinessRepository;
import likelion.hackathon.FlowerSmell.repository.FlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FlowerService {

    private final BusinessRepository businessRepository;

    private final FlowerRepository flowerRepository;

    @Transactional
    public int flowers( int businessId) {

        //엔티티 조회
        Business business = businessRepository.findById(businessId).get();

        //주문 생성
        Flower flower = Flower.createFlower(business);

        //주문 저장
//        flowerRepository.save(flower);

        return flower.getId();
    }

//    public List<Flower> findAllFlowers() {
//        return flowerRepository.findAll();
//    }

    public List<Flower> getAllFlowers() {
        return flowerRepository.findAll();
    }
}
