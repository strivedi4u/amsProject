package com.shashank.controller;

import com.shashank.model.Attend;
import com.shashank.service.AttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@RestController
@RequestMapping("/api/attend")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendController {
    @Autowired
    AttendService attendService;
    @GetMapping("/")
    @PreAuthorize("hasRole('Admin')")
    public List<Attend> getAllAttend(){
        return attendService.getAllAttend();
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('Admin')")
    public String saveAttend(@RequestBody Attend attend) {
        attendService.save(attend);
        return attend.getId().getEmail();
    }

//    @PutMapping("/")
//    public int updateStudent(@RequestBody Attend attend) {
//        attendService.save(attend);
//        return attend.getId().getRollNo();
//    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable("id") int id){
        attendService.delete(id);
    }


    @GetMapping("/{name}")
    @PreAuthorize("hasRole('Admin')")
    private Attend getAllStudentByName(@PathVariable("name") String name){
        return attendService.getAllAttendByName(name);
    }

    @GetMapping("/rollNo/{rollNo}")
    @PreAuthorize("hasRole('User')")
    public List<Attend> getAttendByEmail(@PathVariable("rollNo") int rollNo){
        return attendService.getSAttendByRollNo(rollNo);
    }
}
