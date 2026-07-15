package com.cognizant.ecommerce.service;

import java.io.File;
import java.io.FileOutputStream;

import org.springframework.stereotype.Service;

import com.cognizant.ecommerce.entity.Orders;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class InvoiceService {

    public String generateInvoice(Orders order)
            throws Exception {

        String folder = "invoices";

        File dir = new File(folder);

        if (!dir.exists()) {

            dir.mkdirs();

        }

        String fileName =
                "Invoice_" + order.getId() + ".pdf";

        String path =
                folder + File.separator + fileName;

        Document document = new Document();

        PdfWriter.getInstance(

                document,

                new FileOutputStream(path));

        document.open();

        Font title =
                new Font(Font.FontFamily.HELVETICA,
                        20,
                        Font.BOLD);

        document.add(
                new Paragraph(
                        "ECommerce Invoice",
                        title));

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Invoice No : " + order.getId()));

        document.add(new Paragraph(
                "Customer : "
                        + order.getCustomer().getName()));

        document.add(new Paragraph(
                "Email : "
                        + order.getCustomer().getEmail()));

        document.add(new Paragraph(
                "Order Date : "
                        + order.getOrderDate()));

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Total Amount : ₹ "
                        + order.getTotalAmount()));

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Thank you for shopping with us."));

        document.close();

        return path;

    }

}