package likelion.hackathon.FlowerSmell.model;

import jakarta.persistence.*;
import likelion.hackathon.FlowerSmell.exception.NotEnoughStockException;
import lombok.Data;

@Entity
//@Table(name = "item")
//@Getter @Setter
@Data
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private int id;

    private String name;
    private int price;
    private int stockQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public void setCategory(Category category) {
        this.category = category;
        category.getItems().add(this);
    }


    //비즈니스 로직
    //재고 증가
    public void addStock(int quantity) {
        this.stockQuantity += quantity;
    }

    //재고 감소
    public void removeStock(int quantity) {
        int restStock = this.stockQuantity - quantity;
        if( restStock <0) {
            throw new NotEnoughStockException("need more stock");
        }
        this.stockQuantity = restStock;
    }
}
