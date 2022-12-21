package com.shashank.service;


import com.shashank.model.Payment;
import com.shashank.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepo;
    public List<Payment> getAllPayment() {
        List<Payment> payments = new ArrayList<Payment>();
        paymentRepo.findAll().forEach(stu -> payments.add(stu));
        return payments;
    }

    public void save (Payment payment) {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        payment.setDate(date);
        payment.setTime(time);
        paymentRepo.save(payment);
    }

    public void delete (int id) {
        paymentRepo.deleteById(id);
    }


//    public Payment getAllPaymentByName(String name) {
//        Payment payment = new Payment();
//        paymentRepo.findAll();
//        return payment;
//    }
}
