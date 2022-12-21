package com.shashank.controller;

import com.shashank.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin/")
@CrossOrigin
public class AdminController {
    @Autowired
    AdminService adminService;
    @PostMapping("/")
    public String saveAdmin() throws Exception{
        adminService.save();
        return "Success";
    }
}
