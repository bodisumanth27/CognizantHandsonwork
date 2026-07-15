package com.cognizant.ecommerce.service;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    // ==========================================
    // Send Plain Text Email
    // ==========================================

    public void sendEmail(String to,
                          String subject,
                          String message) {

        try {

            SimpleMailMessage mail =
                    new SimpleMailMessage();

            mail.setTo(to);

            mail.setSubject(subject);

            mail.setText(message);

            mailSender.send(mail);

            logger.info("Plain Email Sent Successfully to {}", to);

        } catch (Exception e) {

            logger.error("Failed to send plain email");

            logger.error(e.getMessage());

        }

    }

    // ==========================================
    // Send HTML Welcome Email
    // ==========================================

    public void sendHtmlEmail(String to,
                              String name)
            throws MessagingException {

        MimeMessage message =
                mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message, true);

        helper.setTo(to);

        helper.setSubject("Welcome to ECommerce");

        String html = """
                <!DOCTYPE html>

                <html>

                <body style="
                        font-family:Arial;
                        background:#f5f5f5;
                        padding:30px;">

                <div style="
                        background:white;
                        padding:25px;
                        border-radius:10px;
                        box-shadow:0px 0px 10px lightgray;">

                <h2 style="color:#1976d2;">
                Welcome to ECommerce
                </h2>

                <p>Hello <b>%s</b>,</p>

                <p>
                Thank you for registering with us.
                </p>

                <p>
                We are excited to have you.
                </p>

                <br>

                <a href="http://localhost:8080/swagger-ui/index.html"

                style="
                background:#1976d2;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:5px;">

                Start Shopping

                </a>

                <br><br>

                Regards,

                <br>

                <b>ECommerce Team</b>

                </div>

                </body>

                </html>

                """.formatted(name);

        helper.setText(html, true);

        mailSender.send(message);

        logger.info("HTML Email Sent Successfully to {}", to);
    }

        // ==========================================
        // Send Order Confirmation Email
        // ==========================================

        public void sendOrderConfirmationEmail(
                String to,
                String customerName,
                Integer orderId,
                Integer totalItems,
                Double totalAmount)
                throws MessagingException {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(to);

            helper.setSubject("Order Confirmation - ECommerce");

            String html = """
                    <!DOCTYPE html>

                    <html>

                    <body style="
                            font-family:Arial;
                            background:#f5f5f5;
                            padding:30px;">

                    <div style="
                            max-width:700px;
                            margin:auto;
                            background:white;
                            padding:30px;
                            border-radius:10px;
                            box-shadow:0px 0px 10px lightgray;">

                    <h2 style="color:green;">
                    Your Order has been Confirmed
                    </h2>

                    <p>Hello <b>%s</b>,</p>

                    <p>
                    Thank you for shopping with us.
                    Your order has been placed successfully.
                    </p>

                    <table
                        border="1"
                        cellpadding="10"
                        cellspacing="0"
                        style="border-collapse:collapse;width:100%%">

                        <tr style="background:#1976d2;color:white;">
                            <th>Details</th>
                            <th>Value</th>
                        </tr>

                        <tr>
                            <td>Order ID</td>
                            <td>%d</td>
                        </tr>

                        <tr>
                            <td>Total Items</td>
                            <td>%d</td>
                        </tr>

                        <tr>
                            <td>Total Amount</td>
                            <td>₹ %.2f</td>
                        </tr>

                    </table>

                    <br>

                    <p>
                    We will notify you once your order has been shipped.
                    </p>

                    <br>

                    <a href="http://localhost:8080/swagger-ui/index.html"

                    style="
                    background:#28a745;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;">

                    Track Order

                    </a>

                    <br><br>

                    Regards,

                    <br>

                    <b>ECommerce Team</b>

                    </div>

                    </body>

                    </html>

                    """.formatted(
                            customerName,
                            orderId,
                            totalItems,
                            totalAmount);

            helper.setText(html, true);

            mailSender.send(message);

            logger.info("Order Confirmation Email Sent Successfully to {}", to);

        }

        // ==========================================
        // Send Email With Attachment
        // ==========================================

        public void sendEmailWithAttachment(
                String to,
                String subject,
                String message,
                String filePath)
                throws Exception {

            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true);

            helper.setTo(to);

            helper.setSubject(subject);

            helper.setText(message);

            FileSystemResource file =
                    new FileSystemResource(new File(filePath));

            helper.addAttachment(file.getFilename(), file);

            mailSender.send(mimeMessage);

            logger.info("Attachment Email Sent Successfully to {}", to);

        }

    }