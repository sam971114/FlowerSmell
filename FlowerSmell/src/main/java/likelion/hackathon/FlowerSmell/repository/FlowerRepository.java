package likelion.hackathon.FlowerSmell.repository;

import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.Flower;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Integer> {
    List<Flower> findAllByFlowerBusiness_id(int flowerBusiness_id);

    List<Flower> findAllByName(String name);
}
