package com.shashank.controller;

import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserLoginController {
    @Autowired
    private UserLoginService userLoginService;


    @PostMapping({"/user/login/"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return userLoginService.createJwtToken(jwtRequest);
    }
}
