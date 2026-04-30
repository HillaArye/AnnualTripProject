package com.example.annualtrip.Services;


import com.example.annualtrip.Entities.Student;
import com.example.annualtrip.Entities.Teacher;
import com.example.annualtrip.Repositories.StudentRepo;
import com.example.annualtrip.Repositories.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepo teacherRepository;

    @Autowired
    private StudentRepo studentRepository;
    public List<Teacher> findAllTeacher() {
        return teacherRepository.findAll();
    }

    public Teacher findTeacherById(String id) {
        return teacherRepository.findById(id).orElseThrow(()-> new RuntimeException("not found teacher with id :"+id));
    }

    public Teacher addTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public List<Student> allStudentsInMyGrade(String id) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(()-> new RuntimeException("not found teacher with id :"+id));
        String grade=teacher.getGrade();
        return studentRepository.findByGrade(grade);
    }

}
