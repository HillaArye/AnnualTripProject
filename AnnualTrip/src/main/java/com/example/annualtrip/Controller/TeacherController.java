package com.example.annualtrip.Controller;

import com.example.annualtrip.Entities.Student;
import com.example.annualtrip.Entities.Teacher;
import com.example.annualtrip.Services.StudentService;
import com.example.annualtrip.Services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;
    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Teacher> getAllTeachers() {
        return teacherService.findAllTeacher();
    }

    @GetMapping("/{id}")
    public Teacher getTeacher(@PathVariable String id) {
        return teacherService.findTeacherById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Teacher addTeacher(@RequestBody Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    @GetMapping("/myclass/{id}")
    public List<Student> getClassByTeacher(@PathVariable String id) {
        return teacherService.allStudentsInMyGrade(id);
    }
    //קבלת כל התלמידות שמרחקם יותר מ3
    @GetMapping("/distant-students")
    public List<Student> getDistantByTeacherMore3(@RequestParam double latitude, @RequestParam double longitude) {
        return studentService.getDistantStudents(latitude, longitude);
    }
}