package com.shashank.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TemplateFile
{

    @RequestMapping(value={"/login", "/admin", "/add", "/documentation/", "/report","/attend" , "/student" , "/face" , "/camera", "/user", "/profile", "/ucamera", "/signup", "/forgot" , "/student" , "/pay" , "/allpay", "/service" , "/about" , "/student" , "/contact" , "/help", "/razorpay"  })
    public String HomePage() {
        return "";
    }
}