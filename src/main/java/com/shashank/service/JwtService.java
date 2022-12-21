package com.shashank.service;


import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.model.Student;
import com.shashank.repository.StudentRepository;
import com.shashank.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
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
public class JwtService implements UserDetailsService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public StudentRepository studentRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
    	System.out.println("Hello Token");
        String userName = jwtRequest.getEmail();
        String userPassword = jwtRequest.getPassword();
        System.out.println("Hello Token 123 " + userName + "Pass " + userPassword);
        authenticate(userName, userPassword);
        System.out.println("Hello ");
        UserDetails userDetails = loadUserByUsername(userName);
        System.out.println("Hello Hmmmmmmmmmmmmm");
        String newGeneratedToken = jwtUtil.generateToken(userDetails);
        System.out.println("Hello Okkkkkkkkkkkkkk");
       Student student = studentRepository.findByEmail(userName);
        System.out.println("Hello Yes");
        return new JwtResponse(student.getEmail(), newGeneratedToken);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentRepository.findByEmail(username);

        if (student != null) {
            return new org.springframework.security.core.userdetails.User(
                    student.getEmail(),
                    student.getPassword(),
                    getAuthority(student)
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private Set getAuthority(Student user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + "User"));
        return authorities;
    }

    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            Student student = studentRepository.findByEmail(userName);
            if (student == null) {
                throw new BadCredentialsException("1000");
            }
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (!encoder.matches(userPassword, student.getPassword())) {
                throw new BadCredentialsException("1000");
            }
            System.out.println("Hello Yes");
            //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            System.out.println("Hello E");
            throw new Exception("USER_DISABLED", e);

        } catch (BadCredentialsException e) {
            System.out.println("Hello Err");
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (Exception e){
            System.out.println("Hello Error");
           System.out.println(e);
        }
    }
}
