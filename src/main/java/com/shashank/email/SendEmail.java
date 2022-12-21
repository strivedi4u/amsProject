package com.shashank.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:3000")
public class SendEmail {
    @Value("${verification.email}")
    private String email;

    @Value("${verification.password}")
    private String password;

    @PostMapping("/")
    public String email(@RequestParam("to") String person, @RequestParam("sub") String sub, @RequestParam("msg") String msg){
        String to = person;
        String subject = sub;
        String message = msg;
        String from = "trivedi2u@gmail.com";
        String host="smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port","465");
        properties.put("mail.smtp.ssl.enable","true");
        properties.put("mail.smtp.auth","true");
        Session session=Session.getInstance(properties, new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });
        session.setDebug(true);
        MimeMessage m = new MimeMessage(session);
        try {
            m.setFrom(from);
            m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            m.setSubject(subject);
            m.setText(message);
            m.setContent(message, "text/html; charset=utf-8");
            Transport.send(m);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return "Success";
    }
}
