package likelion.hackathon.FlowerSmell.repository;


import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Integer>{




    List<Order> findAllByBusiness(Business business);
    List<Order> findAllByUser(User user);

    List<Order> findByUser(User user);
    List<Order> findByBusiness(Business business);


}
