package com.shashank.service;

import com.shashank.model.Admin;
import com.shashank.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void save () {
        Admin admin = new Admin();
        admin.setEmail("s@gmail.com");
        admin.setPassword(getEncodedPassword("123"));
        adminRepository.save(admin);
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
