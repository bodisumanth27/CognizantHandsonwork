package com.cognizant.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI customOpenAPI() {

        return new OpenAPI()

                .info(

                        new Info()

                                .title("E-Commerce REST API")

                                .version("1.0")

                                .description("Spring Boot E-Commerce Application APIs")

                                .contact(

                                        new Contact()

                                                .name("Varun")

                                                .email("varun@example.com"))

                                .license(

                                        new License()

                                                .name("Apache 2.0")));

    }

}