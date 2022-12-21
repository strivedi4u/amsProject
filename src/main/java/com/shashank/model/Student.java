package com.shashank.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

@Document(collection = "students")
public class Student {

    @NotEmpty(message = "The email address is required.")
    @Email(message = "The email address is invalid.", flags = { Pattern.Flag.CASE_INSENSITIVE })
    @Id
    private String email;
    @NotBlank(message = "The password is required.")
    @Pattern(regexp="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Password not match type")
    private String password;

    @Digits(message="Roll Number should contain 5 digits.", fraction = 0, integer = 5)
    private int rollNo;
    @Size(min = 3, message = "Name Size is very Short")
    @Size(max = 50, message = "Name Size is very Long")
    private String name;

    @Pattern(regexp="(^$|[0-9]{10})", message = "Enter 10 numeric digit")
    private String mobile;

    @Size(min = 3, message = "Address Size is very Short")
    @Size(max = 150, message = "Address Size is very Long")
    private String Address;

    private String img1;
    private String img2;
    private String img3;

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String address) {
        Address = address;
    }
    public int getRollNo() {
        return rollNo;
    }
    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getImg1() {
        return img1;
    }
    public void setImg1(String img1) {
        this.img1 = img1;
    }
    public String getImg2() {
        return img2;
    }
    public void setImg2(String img2) {
        this.img2 = img2;
    }
    public String getImg3() {
        return img3;
    }
    public void setImg3(String img3) {
        this.img3 = img3;
    }
}

