package com.shashank.controller;

import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.model.Student;
import com.shashank.service.JwtService;
import com.shashank.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@RestController
//@CrossOrigin
public class JwtController {

//    @Autowired
//    private JwtService jwtService;
//
//
//    @PostMapping({"/authenticate"})
//    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
//        return jwtService.createJwtToken(jwtRequest);
//    }
//    @Autowired
//    public StudentService studentService;
//
//    @GetMapping({"/stu"})
//    @PreAuthorize("hasRole('User')")
//    public List<Student> getAllUStudent(){
//        System.out.println("Get Man");
//        return studentService.getAllStudent();
//    }
//
//    @GetMapping({"/stuu"})
//    @PreAuthorize("hasRole('Admin')")
//    public List<Student> getAllUStudents(){
//        System.out.println("Get Man");
//        return studentService.getAllStudent();
//    }
}
