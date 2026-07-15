package com.cognizant.ecommerce.exception;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==========================================
    // Resource Not Found
    // ==========================================

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse>

    handleResourceNotFound(

            ResourceNotFoundException ex,

            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse();

        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setError("Not Found");
        response.setMessage(ex.getMessage());
        response.setPath(request.getRequestURI());

        return new ResponseEntity<>(

                response,

                HttpStatus.NOT_FOUND);

    }

    // ==========================================
    // Bad Request
    // ==========================================

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse>

    handleBadRequest(

            BadRequestException ex,

            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse();

        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setError("Bad Request");
        response.setMessage(ex.getMessage());
        response.setPath(request.getRequestURI());

        return new ResponseEntity<>(

                response,

                HttpStatus.BAD_REQUEST);

    }

    // ==========================================
    // Validation Exception
    // ==========================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>>

    handleValidationException(

            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()

                .getFieldErrors()

                .forEach(error -> {

                    errors.put(

                            error.getField(),

                            error.getDefaultMessage());

                });

        return new ResponseEntity<>(

                errors,

                HttpStatus.BAD_REQUEST);

    }

    // ==========================================
    // File Too Large
    // ==========================================

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse>

    handleMaxUploadSize(

            MaxUploadSizeExceededException ex,

            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse();

        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setError("File Too Large");
        response.setMessage("Maximum file size is 10 MB.");
        response.setPath(request.getRequestURI());

        return new ResponseEntity<>(

                response,

                HttpStatus.BAD_REQUEST);

    }

    // ==========================================
    // Invalid File
    // ==========================================

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse>

    handleIOException(

            IOException ex,

            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse();

        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setError("Invalid File");
        response.setMessage(ex.getMessage());
        response.setPath(request.getRequestURI());

        return new ResponseEntity<>(

                response,

                HttpStatus.BAD_REQUEST);

    }

    // ==========================================
    // Global Exception
    // ==========================================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>

    handleException(

            Exception ex,

            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse();

        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setError("Internal Server Error");
        response.setMessage(ex.getMessage());
        response.setPath(request.getRequestURI());

        return new ResponseEntity<>(

                response,

                HttpStatus.INTERNAL_SERVER_ERROR);

    }

}