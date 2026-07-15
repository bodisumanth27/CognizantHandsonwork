package com.cognizant.ecommerce.dto;

import java.util.List;

public class OrderRequest {

    private Integer customerId;
    private List<OrderItemRequest> items;

    public OrderRequest() {
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}