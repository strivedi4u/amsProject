package com.shashank.repository;


import com.shashank.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PaymentRepository extends MongoRepository<Payment, Integer> {
}
