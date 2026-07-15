package com.cognizant.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.ecommerce.entity.Category;
import com.cognizant.ecommerce.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category getCategory(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));
    }

    public Category addCategory(Category category) {
        return repository.save(category);
    }

    public Category updateCategory(Integer id, Category category) {

        Category old = getCategory(id);

        old.setName(category.getName());
        old.setDescription(category.getDescription());

        return repository.save(old);
    }

    public void deleteCategory(Integer id) {
        repository.deleteById(id);
    }
}