package likelion.hackathon.FlowerSmell.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Personal {

    @Id
    @GeneratedValue
    @Column(name = "personal_id")
    private Long id;

    @Id @GeneratedValue
    @Column(name = "personal_password")
    private Long password;

    private String phoneNumber;

    private List<Order> orders = new ArrayList<>();
}
