package com.cognizant.ecommerce.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cognizant.ecommerce.entity.Product;
import com.cognizant.ecommerce.service.FileStorageService;
import com.cognizant.ecommerce.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
@Tag(name = "Product Controller",
description = "Product Management APIs")
public class ProductController {

    @Autowired
    private ProductService service;

    @Autowired
    private FileStorageService fileStorageService;

    // ===========================
    // Get All Products
    // ===========================

    @Operation(summary="Get All Products")
    @GetMapping
    public List<Product> getAllProducts(){

        return service.getAllProducts();

    }

    // ===========================
    // Get Product
    // ===========================

    @Operation(summary="Get Product By Id")
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Integer id){

        return service.getProduct(id);

    }

    // ===========================
    // Add Product
    // ===========================

    @Operation(summary="Add Product")
    @PostMapping("/category/{categoryId}")
    public Product addProduct(

            @PathVariable Integer categoryId,

            @Valid

            @RequestBody Product product){

        return service.addProduct(categoryId, product);

    }

    // ===========================
    // Update Product
    // ===========================

    @Operation(summary="Update Product")
    @PutMapping("/{id}")
    public Product updateProduct(

            @PathVariable Integer id,

            @Valid

            @RequestBody Product product){

        return service.updateProduct(id, product);

    }

    // ===========================
    // Delete Product
    // ===========================

    @Operation(summary="Delete Product")
    @DeleteMapping("/{id}")
    public String deleteProduct(

            @PathVariable Integer id){

        service.deleteProduct(id);

        return "Product Deleted Successfully";

    }

    // ===========================
    // Search Product
    // ===========================

    @GetMapping("/search")
    public List<Product> searchProducts(

            @RequestParam String name){

        return service.searchProducts(name);

    }

    // ===========================
    // Category Products
    // ===========================

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(

            @PathVariable Integer categoryId){

        return service.getProductsByCategory(categoryId);

    }

    // ===========================
    // Pagination
    // ===========================

    @GetMapping("/page")
    public Page<Product> getProducts(

            @RequestParam int page,

            @RequestParam int size){

        return service.getProducts(page, size);

    }

    // ===========================
    // Sorting
    // ===========================

    @GetMapping("/sort")
    public List<Product> sortProducts(

            @RequestParam String field){

        return service.sortProducts(field);

    }

    // ===========================
    // Desc Sorting
    // ===========================

    @GetMapping("/sortdesc")
    public List<Product> sortProductsDesc(

            @RequestParam String field){

        return service.sortProductsDesc(field);

    }

    // ===========================
    // Page + Sort
    // ===========================

    @GetMapping("/pagesort")
    public Page<Product> pageSort(

            @RequestParam int page,

            @RequestParam int size,

            @RequestParam String field){

        return service.pageSortProducts(page,size,field);

    }

    // ===========================
    // Dynamic Filter
    // ===========================

    @GetMapping("/filter")
    public List<Product> filterProducts(

            @RequestParam(required=false) String name,

            @RequestParam(required=false) Integer categoryId,

            @RequestParam(required=false) Double minPrice,

            @RequestParam(required=false) Double maxPrice){

        return service.filterProducts(

                name,

                categoryId,

                minPrice,

                maxPrice);

    }

    // ===========================
    // Upload Image
    // ===========================

    @PostMapping("/{id}/upload")
    public Product uploadImage(

            @PathVariable Integer id,

            @RequestParam("file") MultipartFile file)

            throws IOException{

        return service.uploadImage(id,file);

    }

    // ===========================
    // Download/View Image
    // ===========================

    @GetMapping("/image/{fileName}")
    public ResponseEntity<ByteArrayResource>

    downloadImage(

            @PathVariable String fileName)

            throws IOException{

        byte[] data=fileStorageService.downloadFile(fileName);

        ByteArrayResource resource=new ByteArrayResource(data);

        Path path=Paths.get("uploads").resolve(fileName);

        String contentType=Files.probeContentType(path);

        if(contentType==null){

            contentType="application/octet-stream";

        }

        return ResponseEntity.ok()

                .header(HttpHeaders.CONTENT_DISPOSITION,

                        "inline; filename=\"" + fileName + "\"")

                .header(HttpHeaders.CACHE_CONTROL,

                        "max-age=86400")

                .contentType(MediaType.parseMediaType(contentType))

                .contentLength(data.length)

                .body(resource);

    }

    // ===========================
    // Delete Image
    // ===========================

    @DeleteMapping("/{id}/image")
    public String deleteImage(

            @PathVariable Integer id)

            throws IOException{

        service.deleteImage(id);

        return "Image Deleted Successfully";

    }

}