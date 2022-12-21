package com.shashank.service;

import com.shashank.model.Admin;
import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.repository.AdminRepository;
import com.shashank.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AdminLoginService implements UserDetailsService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    public AdminRepository adminRepository;


    public JwtResponse createJwtToken(JwtRequest jwtRequest){
        try {
            String userName = jwtRequest.getEmail();
            String userPassword = jwtRequest.getPassword();
            authenticate(userName, userPassword);
            UserDetails userDetails = loadUserByUsername(userName);
            String newGeneratedToken = jwtUtil.generateToken(userDetails);
            Admin admin = adminRepository.findByEmail(userName);
            return new JwtResponse(admin.getEmail(), newGeneratedToken);
        } catch (Exception e){
            return new JwtResponse(null, null);
        }

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(username);
        if (admin != null) {
            return new org.springframework.security.core.userdetails.User(
                    admin.getEmail(),
                    admin.getPassword(),
                    getAuthority(admin)
            );
        } else {
            return null;
        }
    }

    private Set getAuthority(Admin user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + "Admin"));
        return authorities;
    }

    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            Admin admin = adminRepository.findByEmail(userName);
            if (admin == null) {
                throw new BadCredentialsException("1000");
            }
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (!encoder.matches(userPassword, admin.getPassword())) {
                throw new BadCredentialsException("1000");
            }
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);

        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (Exception e){
        }
    }

}
