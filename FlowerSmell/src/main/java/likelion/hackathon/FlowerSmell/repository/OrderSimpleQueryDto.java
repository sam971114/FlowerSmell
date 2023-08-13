package likelion.hackathon.FlowerSmell.repository;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderSimpleQueryDto {

    private Long orderId;
    private String name;
    private LocalDateTime orderDate;

    public OrderSimpleQueryDto(Long orderId, String name, LocalDateTime orderDate) {
        this.orderId = orderId;
        this.name = name;
        this.orderDate = orderDate;
    }
}
