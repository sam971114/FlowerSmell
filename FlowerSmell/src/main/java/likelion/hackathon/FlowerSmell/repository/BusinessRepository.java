package likelion.hackathon.FlowerSmell.repository;


import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.Item;
import likelion.hackathon.FlowerSmell.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
    public Business findByUsername(String username);
    //select * from user where username = ?

    public List<Business> findBySubscribeTrue();



}
