package com.shashank.controller;

import com.shashank.model.Payment;
import com.shashank.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @GetMapping("/")
    private List<Payment> getAllPayment(){
        return paymentService.getAllPayment();
    }

    @PostMapping("/")
    private int savePayment(@Valid @RequestBody Payment payment) {
        paymentService.save(payment);
        return payment.getRollNo();
    }

//    @PutMapping("/")
//    private int updatePayment(@RequestBody Payment payment) {
//        paymentService.save(payment);
//        return payment.getRollNo();
//    }

    @DeleteMapping("/{id}")
    private void deletePayment(@PathVariable("id") int id){
        paymentService.delete(id);
    }

//
//    @GetMapping("/{name}")
//    private Payment getAllPaymentByName(@PathVariable("name") String name){
//        return paymentService.getAllPaymentByName(name);
//    }
}
