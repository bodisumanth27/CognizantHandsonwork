package com.cognizant.ecommerce.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // ==========================================
    // Upload File
    // ==========================================

    public String uploadFile(MultipartFile file) throws IOException {

        // Empty File Validation
        if (file.isEmpty()) {
            throw new IOException("Please select a file.");
        }

        // File Type Validation
        String contentType = file.getContentType();

        if (contentType == null ||
                !(contentType.equals("image/jpeg")
                        || contentType.equals("image/png")
                        || contentType.equals("image/jpg"))) {

            throw new IOException(
                    "Only JPG, JPEG and PNG images are allowed.");
        }

        // Create Folder Year/Month

        String folder = LocalDate.now().getYear()

                + "/"

                + String.format("%02d",
                        LocalDate.now().getMonthValue());

        Path uploadPath = Paths.get(uploadDir, folder);

        if (!Files.exists(uploadPath)) {

            Files.createDirectories(uploadPath);

        }

        // Original File Name

        String originalFilename = file.getOriginalFilename();

        String extension = "";

        if (originalFilename != null &&
                originalFilename.contains(".")) {

            extension = originalFilename.substring(
                    originalFilename.lastIndexOf("."));

        }

        // UUID File Name

        String fileName =
                UUID.randomUUID().toString() + extension;

        // Save File

        Files.copy(

                file.getInputStream(),

                uploadPath.resolve(fileName),

                StandardCopyOption.REPLACE_EXISTING);

        // Save Folder + Filename in Database

        return folder + "/" + fileName;

    }

    // ==========================================
    // Download File
    // ==========================================

    public byte[] downloadFile(String fileName)
            throws IOException {

        Path path;

        // If no image saved
        if (fileName == null || fileName.isBlank()) {

            path = Paths.get(
                    "src/main/resources/static/images/no-image.png");

        } else {

            path = Paths.get(uploadDir)
                    .resolve(fileName);

            // If image missing
            if (!Files.exists(path)) {

                path = Paths.get(
                        "src/main/resources/static/images/no-image.png");

            }

        }

        return Files.readAllBytes(path);

    }

    // ==========================================
    // Delete File
    // ==========================================

    public void deleteFile(String fileName)
            throws IOException {

        if (fileName == null || fileName.isBlank()) {

            return;

        }

        Path path = Paths.get(uploadDir)
                .resolve(fileName);

        Files.deleteIfExists(path);

    }

}