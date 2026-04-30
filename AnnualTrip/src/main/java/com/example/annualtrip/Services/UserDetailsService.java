package com.example.annualtrip.Services;

import com.example.annualtrip.Entities.Teacher;
import com.example.annualtrip.Repositories.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private TeacherRepo teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Teacher not found with ID: " + id));
        return User.withDefaultPasswordEncoder()
                .username(teacher.getId())
                .password("5069")
                .roles("TEACHER")
                .build();
    }
}