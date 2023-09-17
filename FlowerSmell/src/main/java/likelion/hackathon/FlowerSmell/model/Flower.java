package likelion.hackathon.FlowerSmell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import likelion.hackathon.FlowerSmell.exception.NotEnoughStockException;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Flower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flower_id")
    private int id;

    private String name;

    private Integer size;

    private Integer price;

    private String engName;

    private String message;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business flowerBusiness;



    public void setFlowerBusiness(Business flowerBusiness) {
        this.flowerBusiness = flowerBusiness;
        flowerBusiness.getFlowers().add(this);
    }

    public static Flower createFlower(Business business) {
        Flower flower = new Flower();
        flower.setFlowerBusiness(business);
        return flower;
    }
}
