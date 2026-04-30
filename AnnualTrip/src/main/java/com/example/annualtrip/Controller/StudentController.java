package com.example.annualtrip.Controller;

import com.example.annualtrip.DTO.LocationUpdateRequest;
import com.example.annualtrip.Entities.Student;
import com.example.annualtrip.Entities.StudentLocation;
import com.example.annualtrip.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Student> findAll() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student findById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PostMapping("/addLocation")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addLocation(@RequestBody LocationUpdateRequest request) {
        studentService.addStudentLocation(request);
        return ResponseEntity.ok("Successfully added location");
    }
    //קבלת כל מרחקי התלמידות
    @GetMapping("/locations")
    public List<StudentLocation> getAllLocations() {
        return studentService.getStudentLocations();
    }
}
