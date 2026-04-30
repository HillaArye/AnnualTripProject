package com.example.annualtrip.Repositories;

import com.example.annualtrip.Entities.StudentLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentLocationRepo extends JpaRepository<StudentLocation,Long> {

    StudentLocation findFirstByStudentIdOrderByTimeStampDesc(String studentId);
}
