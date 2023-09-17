package likelion.hackathon.FlowerSmell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_id")
    private int id;
    private String username;
    private String password;
    private String role;

    private String phoneNumber;

    private Boolean subscribe;

    private String address;


    @JsonIgnore
    @OneToMany(mappedBy = "flowerBusiness" , cascade = CascadeType.ALL)
    private List<Flower> flowers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "discardFlowerBusiness" , cascade = CascadeType.ALL)
    private List<DiscardFlower> discardFlowers = new ArrayList<>();


    @CreationTimestamp
    private Timestamp createDate;

    @JsonIgnore
    @OneToMany(mappedBy = "business" , cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "users_business",
        joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "business_id"))
    private List<User> users = new ArrayList<>();
}
