package com.example.annualtrip.Repositories;

import com.example.annualtrip.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends JpaRepository<Student, String> {
    List<Student> findByGrade(String grade);
}
