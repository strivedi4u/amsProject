package com.shashank.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shashank.model.Student;
import com.shashank.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {
 @Autowired
 public StudentService studentService;


    @GetMapping("/image/")
    @PreAuthorize("hasRole('Admin')")
    public List<Student> getAllImage(){
        System.out.println("Get Call");
        System.out.println(studentService);
        return studentService.getAllImage();
    }

        @GetMapping("/")
        @PreAuthorize("hasRole('Admin')")
        public List<Student> getAllUStudent(){
            System.out.println("Get Call");
            System.out.println(studentService);
            return studentService.getAllStudent();
        }

        @PostMapping("/")
        public int saveStudent(@Valid @RequestBody Student student) {
            studentService.save(student);
            return student.getRollNo();
        }

        @PutMapping("/")
        public int updateStudent(@RequestBody Student student) {
            studentService.update(student);
            return student.getRollNo();
        }

        @DeleteMapping("/{email}")
        @PreAuthorize("hasRole('Admin')")
        public void deleteStudent(@PathVariable("email") String email){
            studentService.deleteStudent(email);
        }


        @GetMapping("/{name}")
        @PreAuthorize("hasRole('Admin')")
        public Student getAllStudentByName(@PathVariable("name") String name){
            return studentService.getAllStudentByName(name);
        }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('User')")
    public Student getStudentByEmail(@PathVariable("email") String email){
        return studentService.getStudentByEmail(email);
    }

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Student> getStudentByEmails(@PathVariable("email") String email){
        return studentService.checkStudentByEmail(email);
    }

    @Value("${project.image}")
    private String path;
    @PostMapping("/save/")
    public String createNewObjectWithImage(@Valid @RequestParam("model") String model, @RequestParam("file1") MultipartFile file1, @RequestParam("file2") MultipartFile file2, @RequestParam("file3") MultipartFile file3) throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Student student = mapper.readValue(model, Student.class);
        String img1 = "1" + student.getEmail();
        String img2 = "2" + student.getEmail();
        String img3 = "3" + student.getEmail();
        student.setImg1(img1 + ".jpg");
        student.setImg2(img2 + ".jpg");
        student.setImg3(img3 + ".jpg");
        studentService.save(student);
        try {
            studentService.upload(img1, path, file1);
            studentService.upload(img2, path, file2);
            studentService.upload(img3, path, file3);
            System.out.println("Uploaded");
        } catch (Exception e) {
            e.printStackTrace();
        }
       // System.out.println("Not Uploaded");
        return "Success";

    }


//    @Value("${project.image}")
//    private String FILE_PATH_ROOT;
//
//    @GetMapping("/{filename}")
//    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
//        byte[] image = new byte[0];
//        try {
//            image = FileUtils.readFileToByteArray(new File(FILE_PATH_ROOT+filename));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
//    }


    

    }

