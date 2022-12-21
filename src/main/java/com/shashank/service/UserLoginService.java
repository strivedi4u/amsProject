package com.shashank.service;


import com.shashank.model.JwtRequest;
import com.shashank.model.JwtResponse;
import com.shashank.model.Student;
import com.shashank.repository.StudentRepository;
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
public class UserLoginService implements UserDetailsService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    public StudentRepository studentRepository;


    public JwtResponse createJwtToken(JwtRequest jwtRequest){
        try {
            String userName = jwtRequest.getEmail();
            String userPassword = jwtRequest.getPassword();
            authenticate(userName, userPassword);
            UserDetails userDetails = loadUserByUsername(userName);
            String newGeneratedToken = jwtUtil.generateToken(userDetails);
            Student student = studentRepository.findByEmail(userName);
            return new JwtResponse(student.getEmail(), newGeneratedToken);
        }
        catch (Exception e){
            return new JwtResponse("Error", null);
        }
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
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);

        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (Exception e){
        }
    }

}
