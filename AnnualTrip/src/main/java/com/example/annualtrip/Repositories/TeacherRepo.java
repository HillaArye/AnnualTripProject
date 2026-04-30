package com.example.annualtrip.Repositories;

import com.example.annualtrip.Entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TeacherRepo extends JpaRepository<Teacher, String> {

}
