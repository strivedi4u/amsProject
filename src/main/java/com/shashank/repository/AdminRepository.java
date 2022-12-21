package com.shashank.repository;

import com.shashank.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);
}
