package likelion.hackathon.FlowerSmell.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Business {

    @Id
    @GeneratedValue
    @Column(name = "business_id")
    private Long id;

    @Id @GeneratedValue
    @Column(name = "business_password")
    private Long password;

    private String name;

    private String phoneNumber;

    private List<Order> orders = new ArrayList<>();

    private String businessNumber;

    private String email;

    private String businessPhone;
}
