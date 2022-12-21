package com.shashank.controller;

import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.service.AdminLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AdminLoginController {
    @Autowired
    private AdminLoginService adminLoginService;

    @PostMapping({"/admin/login/"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return adminLoginService.createJwtToken(jwtRequest);
    }
}
