package com.shashank.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

//    @Autowired
//    private UserService userService;
//    @Autowired
//    private StudentService studentService;
//
//    @PostConstruct
//    public void initRoleAndUser() {
//        userService.initRoleAndUser();
//    }
//
////    @PostMapping({"/registerNewUser"})
////    public User registerNewUser(@RequestBody User user) {
////        return userService.registerNewUser(user);
////    }
//
//    @GetMapping({"/forAdmin"})
//    @PreAuthorize("hasRole('Admin')")
//    public String forAdmin(){
//        return "This URL is only accessible to the admin";
//    }
//
//    @GetMapping({"/forUser"})
//    @PreAuthorize("hasRole('User')")
//    public List<Student> forUser(){
//        System.out.println(studentService);
//        System.out.println(userService.hello());
//        System.out.println(studentService.getAllStudent());
//        return studentService.getAllStudent();
//    }
////    @Autowired
////    StudentService studentService;
//    @GetMapping({"/for"})
//    @PreAuthorize("hasRole('User')")
//    private List<Student> getAllUStudent(){
//        System.out.println("Get Call");
//        return studentService.getAllStudent();
//    }



}
