package likelion.hackathon.FlowerSmell.service;


import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.DiscardFlower;
import likelion.hackathon.FlowerSmell.repository.DiscardFlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiscardFlowerService {


    private final DiscardFlowerRepository discardFlowerRepository;

    @Transactional
    public int register(DiscardFlower discardFlower) {
        discardFlowerRepository.save(discardFlower);
        return discardFlower.getId();
    }

    public List<DiscardFlower> findMembers() {
        return discardFlowerRepository.findAll();
    }

    public DiscardFlower findOne(int memberId) {
        return discardFlowerRepository.findById(memberId).get();
    }

    public DiscardFlower findByName(String name) {
        return discardFlowerRepository.findByName(name);
    }
}
