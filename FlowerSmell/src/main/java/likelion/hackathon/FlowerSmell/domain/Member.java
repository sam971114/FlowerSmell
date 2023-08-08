package likelion.hackathon.FlowerSmell.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Id @GeneratedValue
    @Column(name = "member_password")
    private Long password;

    private String name;

    private String phoneNumber;

    private List<Order> orders = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    private String businessNumber;

    private String email;

    private String businessPhone;
}
