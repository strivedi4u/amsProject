package com.shashank.repository;

import com.shashank.model.Attend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface AttendRepository extends MongoRepository<Attend, Attend.CompositeKey>{


    List<Attend> findByRollNo(int rollNo);
    Attend findId(int findId);
}