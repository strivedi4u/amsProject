package com.shashank.razorpay;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pay")
@CrossOrigin(origins = "http://localhost:3000")
public class PayOrder {

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    @GetMapping("/{amount}")
    public String createOrder(@PathVariable("amount") int amount) throws RazorpayException {
        RazorpayClient razorpay = null;
        razorpay = new RazorpayClient(key, secret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt#1");
        JSONObject notes = new JSONObject();
        notes.put("notes_key_1", "Tea, Earl Grey, Hot");
        notes.put("notes_key_1", "Tea, Earl Grey, Cold");
        orderRequest.put("notes", notes);

        Order order = razorpay.Orders.create(orderRequest);
        JSONObject json = new JSONObject(order.toString());
        System.out.println(json.getString("id"));
        return order.toString();
    }
}
