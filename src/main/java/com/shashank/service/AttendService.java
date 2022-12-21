package com.shashank.service;

import com.shashank.model.Attend;
import com.shashank.repository.AttendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.shashank.model.Attend.counter;

@Service
public class AttendService {
    @Autowired
    private AttendRepository attendRepo;
    public List<Attend> getAllAttend() {
        List<Attend> attends = new ArrayList<Attend>();
        attendRepo.findAll().forEach(stu -> attends.add(stu));
        return attends;
    }

    public void save (Attend attend) {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        Attend.CompositeKey key = new Attend.CompositeKey();
        String email = attend.getId().getEmail();
        key.setEmail(email);
        key.setDate(date);
        attend.setId(key);
        attend.setTime(time);
        attend.setFindId(counter++);
        attendRepo.save(attend);
    }

    public void delete (int id) {
        Attend attend = attendRepo.findId(id);
        attendRepo.delete(attend);
    }


    public Attend getAllAttendByName(String name) {
        Attend attend = new Attend();
        attendRepo.findAll();
        return attend;
    }
    public List<Attend> getSAttendByRollNo(int rollNo){
        return attendRepo.findByRollNo(rollNo);
    }
}
