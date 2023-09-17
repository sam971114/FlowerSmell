package likelion.hackathon.FlowerSmell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DiscardFlower {

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
    private Business discardFlowerBusiness;

    public void setDiscardFlowerBusiness(Business discardFlowerBusiness) {
        this.discardFlowerBusiness = discardFlowerBusiness;
        discardFlowerBusiness.getDiscardFlowers().add(this);
    }

    public static DiscardFlower createDiscardFlower(Business business) {
        DiscardFlower discardFlower = new DiscardFlower();
        discardFlower.setDiscardFlowerBusiness(business);
        return discardFlower;
    }

}
