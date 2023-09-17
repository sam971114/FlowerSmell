package likelion.hackathon.FlowerSmell.repository;

import likelion.hackathon.FlowerSmell.model.DiscardFlower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscardFlowerRepository extends JpaRepository<DiscardFlower, Integer> {
    public DiscardFlower findByName(String name);
}
