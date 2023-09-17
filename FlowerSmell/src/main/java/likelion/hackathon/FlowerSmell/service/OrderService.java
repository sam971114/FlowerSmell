package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.*;
import likelion.hackathon.FlowerSmell.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    private final BusinessRepository businessRepository;


    //주문
    @Transactional
    public int order(int memberId, int businessId, int itemId, int count) {

        //엔티티 조회
        User member = userRepository.findById(memberId).get();
        Business business = businessRepository.findById(businessId).get();
        Item item = itemRepository.findById(itemId).get();



        //주문상품 생성
        OrderItem orderItem = OrderItem.createOrderItem(item, item.getPrice(), count);

        //주문 생성
        Order order = Order.createOrder(member, business, orderItem);

        //주문 저장
        orderRepository.save(order);

        return order.getId();
    }

//    @Transactional
//    public int order_flower(int memberId, int businessId, List<FlowerDto> flowerDtos) {
//
//        //엔티티 조회
//        User member = userRepository.findById(memberId).get();
//        Business business = businessRepository.findById(businessId).get();
//        FlowerDto flowerDto = flowerDtoRepository.findById(flowerDtoId).get();
//
//        //주문상품 생성
//        List<FlowerDto> real_flowerDtos = flowerDtos;
//
//
//        //주문 생성
//        Order order = Order.createFlowerOrder(member, business, flo);
//
//        //주문 저장
//        orderRepository.save(order);
//
//        return order.getId();
//    }

    @Transactional
    public int order_flower(int memberId, int businessId, int total_price) {

        //엔티티 조회
        User member = userRepository.findById(memberId).get();
        Business business = businessRepository.findById(businessId).get();
        Integer total = total_price;


        //주문 생성
        Order order = Order.createOrderTwo(member, business, total);

        //주문 저장
        orderRepository.save(order);

        return order.getId();
    }





    //검색
    public List<Order> findOrders(OrderSearch orderSearch) {
        return orderRepository.findAll();
    }
}
