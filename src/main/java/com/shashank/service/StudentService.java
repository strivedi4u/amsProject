package com.shashank.service;

import com.shashank.model.Student;
import com.shashank.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    public List<Student> getAllImage() {
        List<Student> students = new ArrayList<Student>();
        return studentRepo.findAllImage();

    }
    public List<Student> getAllStudent() {
        List<Student> students = new ArrayList<Student>();
        studentRepo.findAll().forEach(stu -> students.add(stu));
        return students;
    }

    public void save (Student student) {
        student.setPassword(getEncodedPassword(student.getPassword()));
        studentRepo.save(student);
    }

    public void update (Student student) {
        String email = student.getEmail();
        Student student1 = studentRepo.findByEmail(email);
        int rollNo = student.getRollNo();
        String name = student.getName();
        String mobile = student.getMobile();
        String address = student.getAddress();
        String password = student.getPassword();
        if(rollNo == 0){
            student.setRollNo(student1.getRollNo());
        }
        if(name == null){
            student.setName(student1.getName());
        }
        if(mobile == null){
            student.setMobile(student1.getMobile());
        }
        if(address == null){
            student.setAddress(student1.getAddress());
        }
        if(password == null){
            student.setPassword(student1.getPassword());
        }
        student.setPassword(getEncodedPassword(student.getPassword()));
        studentRepo.save(student);
    }

    public void delete (String email) {
        studentRepo.deleteById(email);
    }


    public Student getAllStudentByName(String name){
       return studentRepo.getAllStudentByName(name);
    }

    public Student getStudentByEmail(String email){
        return studentRepo.findByEmail(email);
    }


    public ResponseEntity<Student> checkStudentByEmail(String email){
        try {
            Student student = studentRepo.findByEmail(email);
            if((student.getEmail()).equals(email)){
                return new ResponseEntity<Student>(
                        student,
                        HttpStatus.OK);
            }else {
                return new ResponseEntity<>(
                        student,
                        HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<>(
                    HttpStatus.BAD_REQUEST);
        }
    }


    public void upload(String id, String path, MultipartFile file){
        String name = file.getOriginalFilename();
        String filePath = path + File.separator + id + ".jpg";
        Path paths = Paths.get(filePath);
        File f = new File(path);
        if(!f.exists()) {
            f.mkdir();
        }
        try {
            Files.delete(paths);
            System.out.println(id);
        }
        catch (Exception e){
            System.out.println(e);
        }
        try {
           Files.copy(file.getInputStream(), paths);
        }
        catch (Exception e){
            System.out.println(e);
        }

    }

    public void deleteStudent(String email)  {
        studentRepo.deleteById(email);
        Path path1 = Paths.get("./images/" + "1" + email + ".jpg");
        Path path2 = Paths.get("./images/" + "2" + email + ".jpg");
        Path path3 = Paths.get("./images/" + "3" + email + ".jpg");
        try {
            Files.delete(path1);
            Files.delete(path2);
            Files.delete(path3);
            System.out.println("File or directory deleted successfully");
        } catch (NoSuchFileException ex) {
            System.out.println("No such file or directory:");
        } catch (DirectoryNotEmptyException ex) {
            System.out.println("Directory %s is not empty");
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}

