package likelion.hackathon.FlowerSmell.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
//@Getter @Setter
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business business;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

//    @OneToMany(mappedBy = "order_flower", cascade = CascadeType.ALL)
//    private List<FlowerDto> flowerDtos = new ArrayList<>();


    private LocalDateTime orderDate;

    private Integer total_price;

    private String user_name;

    private String business_name;

    private String oppsite_name;

//    @CreationTimestamp
//    private Timestamp orderDate;



    public void setMember(User user) {
        this.user = user;
        user.getOrders().add(this);
    }

    public void setBusiness(Business business) {
        this.business = business;
        business.getOrders().add(this);
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }


//    public void addFlowerDto(FlowerDto flowerdto) {
//        flowerDtos.add(flowerdto);
//        flowerdto.setOrder_flower(this);
//    }





    //생성 메서드
    public static Order createOrder(User user,  Business business, OrderItem... orderItems) {
        Order order = new Order();
        order.setMember(user);
        order.setBusiness(business);
        for(OrderItem orderItem : orderItems) {
            order.addOrderItem(orderItem);
        }
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    public static Order createOrderTwo(User user,  Business business, int total_price) {
        Order order = new Order();
        order.setMember(user);
        order.setBusiness(business);
        order.setTotal_price(total_price);
        order.setOrderDate(LocalDateTime.now());
        order.setUser_name(user.getUsername());
        order.setBusiness_name(business.getUsername());
        order.setOppsite_name("nothing");
        return order;
    }

//    public static Order createFlowerOrder(User user, Business business, int quantity ,FlowerDto... flowerDtos) {
//        Order order = new Order();
//        order.setUser(user);
//        order.setBusiness(business);
//        for(FlowerDto flowerDto : flowerDtos) {
//            order.addFlowerDto(flowerDto);
//        }
//        order.setOrderDate(LocalDateTime.now());
//        return order;
//    }



    //조회 로직 - 전체 주문 가격 조회
    public int getTotalPrice() {
        return orderItems.stream()
                .mapToInt(OrderItem::getTotalPrice)
                .sum();
    }


}
