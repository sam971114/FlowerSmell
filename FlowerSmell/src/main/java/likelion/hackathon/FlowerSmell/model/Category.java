package likelion.hackathon.FlowerSmell.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private int id;

    private String name;

    @OneToMany(mappedBy = "category" , cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

}
