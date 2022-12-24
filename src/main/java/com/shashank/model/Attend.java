package com.shashank.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "attends")
public class Attend {


     public static long counter = 0;
     private long findId;
     public  long getFindId() {
        return findId;
    }

    public  void setFindId(long findId) {
        this.findId = findId;
    }

    @Id
    private CompositeKey id;


    public CompositeKey getId() {
        return id;
    }

    public void setId(CompositeKey id) {
        this.id = id;
    }

    public static class CompositeKey implements Serializable {

        @Id
        private String email;
        @JsonFormat(pattern="yyyy-MM-dd")
        private LocalDate date;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

    }



    @NotBlank(message = "Name is mandatory")
    private String name;

    private int rollNo;
    @NotEmpty(message = "The mobile address is required.")
    @Pattern(regexp="(^$|[0-9]{10})", message = "Enter 10 numeric digit")
    private String Mobile;



    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime time;



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getMobile() {
        return Mobile;
    }

    public int getRollNo() {
        return rollNo;
    }

    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }

    public void setMobile(String mobile) {
        Mobile = mobile;
    }


    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }


}
