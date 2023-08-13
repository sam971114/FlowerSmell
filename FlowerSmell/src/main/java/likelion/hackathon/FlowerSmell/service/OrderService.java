package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.model.domain.Item;
import likelion.hackathon.FlowerSmell.model.domain.Order;
import likelion.hackathon.FlowerSmell.model.domain.OrderItem;
import likelion.hackathon.FlowerSmell.repository.ItemRepository;
import likelion.hackathon.FlowerSmell.repository.OrderRepository;
import likelion.hackathon.FlowerSmell.repository.OrderSearch;
import likelion.hackathon.FlowerSmell.repository.UserRepository;
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

    //주문
    @Transactional
    public int order(int memberId, Long itemId, int count) {

        //엔티티 조회
        User member = userRepository.findById(memberId).get();
        Item item = itemRepository.findOne(itemId);



        //주문상품 생성
        OrderItem orderItem = OrderItem.createOrderItem(item, item.getPrice(), count);

        //주문 생성
        Order order = Order.createOrder(member, orderItem);

        //주문 저장
        orderRepository.save(order);

        return order.getId();
    }





    //검색
    public List<Order> findOrders(OrderSearch orderSearch) {
        return orderRepository.findAll(orderSearch);
    }
}
