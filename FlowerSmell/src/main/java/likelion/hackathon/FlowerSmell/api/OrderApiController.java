package likelion.hackathon.FlowerSmell.api;


import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.Item;
import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.model.Order;
import likelion.hackathon.FlowerSmell.repository.BusinessRepository;
import likelion.hackathon.FlowerSmell.repository.OrderRepository;
import likelion.hackathon.FlowerSmell.repository.UserRepository;
import likelion.hackathon.FlowerSmell.service.OrderService;
import likelion.hackathon.FlowerSmell.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class OrderApiController {

    private final OrderRepository orderRepository;

    private final OrderService orderService;

    private final UserService userService;

    private final UserRepository userRepository;

    private final BusinessRepository businessRepository;

    @GetMapping("/api/allOrders")
    public List<Order> allOrders() {
        List<Order> all = orderRepository.findAll();
        for (Order order : all) {
            order.getUser().getUsername(); //Lazy 강제 초기화
            order.getBusiness().getUsername();
            order.getTotal_price();
            order.getBusiness_name();
            order.getUser_name();
            order.getOrderDate();

        }
        return all;
    }

    @GetMapping("/api/allOrders/user/{user_id}")
    public List<Order> allUserOrders(@PathVariable int user_id) {
        User user = userRepository.findById(user_id).get();
        List<Order> userAll = orderRepository.findByUser(user);
//        for (Order order : userAll) {
//            order.getUser().getUsername();//Lazy 강제 초기화
//        }
        return userAll;
    }

    //createDate / item변수받아서 해당 목록 출력하는 api만들기

    @GetMapping("/api/allOrders/business/{business_id}")
    public List<Order> allBusinessOrders(@PathVariable int business_id) {
        Business business = businessRepository.findById(business_id).get();
        List<Order> businessAll = orderRepository.findByBusiness(business);
        for (Order order : businessAll) {
            order.getUser().getUsername(); //Lazy 강제 초기화
        }

        return businessAll;
    }

    @PostMapping("/api/makeOrder")
    public void makeOrders(@RequestBody OrderDto orderDto) {
        orderService.order_flower(orderDto.userId, orderDto.businessId, orderDto.total_price);
    }



    @GetMapping("/api/v2/allOrdersMap")
    public List<SimpleOrderDto> allOrdersMap() {
        List<Order> orders = orderRepository.findAll();

        List<SimpleOrderDto> result = orders.stream()
                .map(o -> new SimpleOrderDto(o))
                .collect(toList());
        return result;
    }

    @GetMapping("/api/findAllByUser/{user}")
    public List<Order> findAllByUser(@PathVariable User user) {
        List<Order> orders = orderRepository.findAllByUser(user);
        return orders;
    }

    @GetMapping("/api/findAllByBusiness/{business}")
    public List<Order> findAllByUser(@PathVariable Business business) {
        List<Order> orders = orderRepository.findAllByBusiness(business);
        return orders;
    }



    @Data
    static class SimpleOrderDto {
        private int orderId;
        private String username;
        private LocalDateTime orderDate;


        public SimpleOrderDto(Order order) {
            orderId = order.getId();
            username = order.getUser().getUsername();
            orderDate = order.getOrderDate();

        }
    }

    @Data
    static class OrderDto {
        private int userId;

        private int businessId;

        private int total_price;
    }

//    @Data
//    static class OrderPlusBusiness {
//
//        private int ordered_id;
//        private String username;
//        private String business_name;
//
//        private LocalDateTime orderTime;
//
//        private int total_price;
//
//
//
//
//
//        public OrderPlusBusiness(Order order) {
//            this.ordered_id = order.getId();
//            username =
//            id = order.getId();
//
//        }
//    }


}
