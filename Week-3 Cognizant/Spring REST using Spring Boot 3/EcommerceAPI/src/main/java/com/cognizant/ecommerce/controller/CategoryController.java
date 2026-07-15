package com.cognizant.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cognizant.ecommerce.entity.Category;
import com.cognizant.ecommerce.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable Integer id) {
        return service.getCategory(id);
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return service.addCategory(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Integer id,
                                   @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Integer id) {

        service.deleteCategory(id);

        return "Category Deleted Successfully";
    }
}