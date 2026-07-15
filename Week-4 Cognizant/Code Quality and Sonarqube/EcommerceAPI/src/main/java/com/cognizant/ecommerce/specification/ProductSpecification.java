package com.cognizant.ecommerce.specification;

import org.springframework.data.jpa.domain.Specification;

import com.cognizant.ecommerce.entity.Product;

public class ProductSpecification {

    public static Specification<Product> hasName(String name) {

        return (root, query, cb) ->

                name == null || name.isBlank()
                        ? cb.conjunction()
                        : cb.like(
                                cb.lower(root.get("name")),
                                "%" + name.toLowerCase() + "%");
    }

    public static Specification<Product> hasCategory(Integer categoryId) {

        return (root, query, cb) ->

                categoryId == null
                        ? cb.conjunction()
                        : cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Product> minPrice(Double minPrice) {

        return (root, query, cb) ->

                minPrice == null
                        ? cb.conjunction()
                        : cb.greaterThanOrEqualTo(
                                root.get("price"),
                                minPrice);
    }

    public static Specification<Product> maxPrice(Double maxPrice) {

        return (root, query, cb) ->

                maxPrice == null
                        ? cb.conjunction()
                        : cb.lessThanOrEqualTo(
                                root.get("price"),
                                maxPrice);
    }

}