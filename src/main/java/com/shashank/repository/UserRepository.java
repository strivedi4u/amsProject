package com.shashank.repository;

import com.shashank.model.Student;

import com.shashank.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRepository extends MongoRepository<Student, String> {
}
