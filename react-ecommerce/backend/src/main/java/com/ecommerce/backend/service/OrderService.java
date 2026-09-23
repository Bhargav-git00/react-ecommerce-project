package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.OrderItemRequest;
import com.ecommerce.backend.dto.OrderRequest;
import com.ecommerce.backend.dto.OrderResponse;
import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse placeOrder(User user, OrderRequest request) {

        if (request.items() == null || request.items().isEmpty()) {
            throw new ApiException(400, "Order items are required");
        }

        Order order = new Order(user, "PLACED");

        // Total is ALWAYS computed on the server - client totalAmount is ignored
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest item : request.items()) {
            order.addItem(new OrderItem(
                    item.productId(),
                    item.title(),
                    item.price(),
                    item.quantity(),
                    item.image()));

            total = total.add(item.price().multiply(BigDecimal.valueOf(item.quantity())));
        }

        order.setTotalAmount(total);

        order = orderRepository.save(order);

        return toResponse(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> myOrders(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::toResponse)
                .toList();
    }

    private OrderResponse toResponse(Order order) {
        List<OrderItemRequest> items = order.getItems().stream()
                .map(item -> new OrderItemRequest(
                        item.getProductId(),
                        item.getTitle(),
                        item.getPrice(),
                        item.getQuantity(),
                        item.getImage()))
                .toList();

        return new OrderResponse(
                order.getId(),
                items,
                order.getTotalAmount(),
                order.getStatus(),
                order.getCreatedAt());
    }
}
