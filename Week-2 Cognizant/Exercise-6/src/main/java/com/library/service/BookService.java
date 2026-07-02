package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public void addBook() {

        System.out.println("Book Service Started");

        bookRepository.saveBook();

        System.out.println("Book Service Completed");

    }

}