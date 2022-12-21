package com.shashank.repository;

import com.shashank.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
    public interface StudentRepository extends MongoRepository<Student, String> {
        @Query(value="{}", fields = "")
        List<Student> findAllImage();
      //  @Query(value="{}", fields = "{name:1}")
        Student getAllStudentByName(String name);


    Student findByEmail(String email);
}
