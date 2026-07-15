package com.cognizant.ecommerce.service;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cognizant.ecommerce.entity.Category;
import com.cognizant.ecommerce.entity.Product;
import com.cognizant.ecommerce.exception.ResourceNotFoundException;
import com.cognizant.ecommerce.repository.CategoryRepository;
import com.cognizant.ecommerce.repository.ProductRepository;
import com.cognizant.ecommerce.specification.ProductSpecification;

@Service
public class ProductService {

    private static final Logger logger =
            LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileStorageService fileStorageService;

    // ==========================================
    // Get All Products
    // ==========================================

    @Cacheable(value = "products")
    public List<Product> getAllProducts() {

        logger.info("Fetching Products From Database");

        return productRepository.findAll();
    }

    // ==========================================
    // Get Product By Id
    // ==========================================

    @Cacheable(value = "product", key = "#id")
    public Product getProduct(Integer id) {

        logger.info("Fetching Product {} From Database", id);

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product Not Found"));
    }

    // ==========================================
    // Add Product
    // ==========================================

    @CacheEvict(value = {"products","product"}, allEntries = true)
    public Product addProduct(Integer categoryId, Product product) {

        logger.info("Adding Product");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category Not Found"));

        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        logger.info("Product Added Successfully");

        return savedProduct;
    }

    // ==========================================
    // Update Product
    // ==========================================

    @CachePut(value = "product", key = "#id")
    @CacheEvict(value = "products", allEntries = true)
    public Product updateProduct(Integer id,
                                 Product product) {

        logger.info("Updating Product {}", id);

        Product old = getProduct(id);

        old.setName(product.getName());
        old.setDescription(product.getDescription());
        old.setPrice(product.getPrice());
        old.setStock(product.getStock());

        if (product.getCategory() != null) {
            old.setCategory(product.getCategory());
        }

        Product updated = productRepository.save(old);

        logger.info("Product Updated Successfully");

        return updated;
    }
    // ==========================================
    // Delete Product
    // ==========================================

    @CacheEvict(value = {"products","product"}, allEntries = true)
    public void deleteProduct(Integer id) {

        logger.info("Deleting Product {}", id);

        Product product = getProduct(id);

        if (product.getImageName() != null) {

            try {

                fileStorageService.deleteFile(
                        product.getImageName());

            } catch (IOException e) {

                logger.warn("Unable to delete image : {}",
                        e.getMessage());
            }

        }

        productRepository.delete(product);

        logger.info("Product Deleted Successfully");
    }

    // ==========================================
    // Get Products By Category
    // ==========================================

    public List<Product> getProductsByCategory(Integer categoryId) {

        logger.info("Fetching Products By Category {}",
                categoryId);

        return productRepository.findByCategoryId(categoryId);
    }

    // ==========================================
    // Search Product
    // ==========================================

    public List<Product> searchProducts(String name) {

        logger.info("Searching Products : {}", name);

        return productRepository
                .findByNameContainingIgnoreCase(name);
    }

    // ==========================================
    // Pagination
    // ==========================================

    public Page<Product> getProducts(int page,
                                     int size) {

        Pageable pageable =
                PageRequest.of(page, size);

        return productRepository.findAll(pageable);
    }

    // ==========================================
    // Sorting ASC
    // ==========================================

    public List<Product> sortProducts(String field) {

        return productRepository.findAll(
                Sort.by(field));
    }

    // ==========================================
    // Sorting DESC
    // ==========================================

    public List<Product> sortProductsDesc(String field) {

        return productRepository.findAll(
                Sort.by(field).descending());
    }

    // ==========================================
    // Pagination + Sorting
    // ==========================================

    public Page<Product> pageSortProducts(int page,
                                          int size,
                                          String field) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(field));

        return productRepository.findAll(pageable);
    }

    // ==========================================
    // Dynamic Search
    // ==========================================

    public List<Product> filterProducts(
            String name,
            Integer categoryId,
            Double minPrice,
            Double maxPrice) {

        Specification<Product> specification =
                Specification
                        .where(ProductSpecification.hasName(name))
                        .and(ProductSpecification.hasCategory(categoryId))
                        .and(ProductSpecification.minPrice(minPrice))
                        .and(ProductSpecification.maxPrice(maxPrice));

        return productRepository.findAll(specification);
    }
    // ==========================================
    // Upload Product Image
    // ==========================================

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product uploadImage(Integer productId,
                               MultipartFile file)
            throws IOException {

        logger.info("Uploading image for Product {}", productId);

        Product product = getProduct(productId);

        // Delete old image if exists
        if (product.getImageName() != null) {

            fileStorageService.deleteFile(
                    product.getImageName());

            logger.info("Old image deleted");
        }

        // Upload new image
        String fileName =
                fileStorageService.uploadFile(file);

        product.setImageName(fileName);

        Product updated =
                productRepository.save(product);

        logger.info("New image uploaded successfully");

        return updated;
    }

    // ==========================================
    // Delete Product Image
    // ==========================================

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void deleteImage(Integer productId)
            throws IOException {

        logger.info("Deleting Product Image");

        Product product = getProduct(productId);

        if (product.getImageName() != null) {

            fileStorageService.deleteFile(
                    product.getImageName());

            product.setImageName(null);

            productRepository.save(product);

            logger.info("Image Deleted Successfully");
        }
    }

}