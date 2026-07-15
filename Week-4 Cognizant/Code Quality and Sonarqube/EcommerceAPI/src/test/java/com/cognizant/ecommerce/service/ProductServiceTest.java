package com.cognizant.ecommerce.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.cognizant.ecommerce.entity.Category;
import com.cognizant.ecommerce.entity.Product;
import com.cognizant.ecommerce.repository.CategoryRepository;
import com.cognizant.ecommerce.repository.ProductRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private FileStorageService fileStorageService;

    private Product product;
    private Category category;

    @BeforeEach
    void setup() {

        category = new Category();
        category.setId(1);
        category.setName("Electronics");

        product = new Product();
        product.setId(1);
        product.setName("Laptop");
        product.setDescription("Dell Laptop");
        product.setPrice(65000.0);
        product.setStock(10);
        product.setCategory(category);
    }

    @Test
    void testGetProduct() {

        when(productRepository.findById(1))
                .thenReturn(Optional.of(product));

        Product p = productService.getProduct(1);

        assertEquals("Laptop", p.getName());

        verify(productRepository).findById(1);
    }

    @Test
    void testGetAllProducts() {

        when(productRepository.findAll())
                .thenReturn(Arrays.asList(product));

        List<Product> products = productService.getAllProducts();

        assertEquals(1, products.size());

        verify(productRepository).findAll();
    }

    @Test
    void testAddProduct() {

        when(categoryRepository.findById(1))
                .thenReturn(Optional.of(category));

        when(productRepository.save(product))
                .thenReturn(product);

        Product saved = productService.addProduct(1, product);

        assertEquals("Laptop", saved.getName());
        assertEquals("Electronics", saved.getCategory().getName());

        verify(categoryRepository).findById(1);
        verify(productRepository).save(product);
    }

}