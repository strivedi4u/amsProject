package com.shashank.controller;

import com.shashank.model.Attend;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//@RestController
public class CheckController {
//    @Value("${project.ima}")
//    private String path;
//
//    @RequestMapping(value = "/sid", method = RequestMethod.GET,
//            produces = MediaType.IMAGE_JPEG_VALUE)
//    public void getImage(HttpServletResponse response) throws IOException {
//
//        var imgFile = new ClassPathResource("D:\\InteliJProject\\FinalAmsPortalProject\\backend\\backend\\images\\" + "a85.jpg");
//
//        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//        StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
//    }
}
