package likelion.hackathon.FlowerSmell.repository;

import likelion.hackathon.FlowerSmell.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


//CRUD 함수 JPA~가 들고있음
//@Repository 없어도 injection o
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByUsername(String username);
    //select * from user where username = ?

    public User findByUsernameAndPassword(String username, String password);
}
