package likelion.hackathon.FlowerSmell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import likelion.hackathon.FlowerSmell.model.domain.Order;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int id;
    private String username;
    private String password;
    private String email;
    private String role;

    private String phoneNumber;


//    private Timestamp loginDate;


    @CreationTimestamp
    private Timestamp createDate;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();


}
