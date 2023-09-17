package likelion.hackathon.FlowerSmell.repository;

import jakarta.persistence.EntityManager;
import likelion.hackathon.FlowerSmell.model.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item, Integer> {



}
