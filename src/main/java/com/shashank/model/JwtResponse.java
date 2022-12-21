package com.shashank.model;


import javax.validation.constraints.NotBlank;

public class JwtResponse {
    @NotBlank(message = "Email Or Password Error")
    private String email;
    @NotBlank(message = "Email Or Password Error")
    private String jwtToken;

    public JwtResponse(String email, String jwtToken) {
        this.email = email;
        this.jwtToken = jwtToken;
    }

    public String getUser() {
        return email;
    }

    public void setUser(Users user) {
        this.email = email;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
