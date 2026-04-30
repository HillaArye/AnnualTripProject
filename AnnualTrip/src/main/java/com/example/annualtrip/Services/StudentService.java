package com.example.annualtrip.Services;


import com.example.annualtrip.DTO.LocationUpdateRequest;
import com.example.annualtrip.Entities.Student;
import com.example.annualtrip.Entities.StudentLocation;
import com.example.annualtrip.Repositories.StudentLocationRepo;
import com.example.annualtrip.Repositories.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepo StudentRepository;

    @Autowired
    private StudentLocationRepo studentLocationRepository;

    public List<Student> getAllStudents() {
        return StudentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return StudentRepository.findById(id).orElseThrow(()->new RuntimeException("Not found student with id :"+id));
    }

    public Student addStudent(Student student) {
       return StudentRepository.save(student);
    }

    public void addStudentLocation(LocationUpdateRequest dto) {
        StudentLocation studentLocation = new StudentLocation();

        studentLocation.setStudentId(dto.getId());

        double lat= convertToDecimal(
              dto.getCoordinates().getLatitude().getDegrees(),
              dto.getCoordinates().getLatitude().getMinutes(),
              dto.getCoordinates().getLatitude().getSeconds()
        );
        studentLocation.setLatitude(lat);

        double lon= convertToDecimal(
              dto.getCoordinates().getLongitude().getDegrees(),
              dto.getCoordinates().getLongitude().getMinutes(),
              dto.getCoordinates().getLongitude().getSeconds()
        );
        studentLocation.setLongitude(lon);
        studentLocation.setTimeStamp(LocalDateTime.parse(dto.getTime(), java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        studentLocationRepository.save(studentLocation);
    }

    private double convertToDecimal(String degrees, String minutes, String seconds) {
        return Double.parseDouble(degrees) +
                (Double.parseDouble(minutes) / 60.0) +
                (Double.parseDouble(seconds) / 3600.0);
    }

    public List<StudentLocation> getStudentLocations() {
        List<Student> allStudents =  StudentRepository.findAll();
        return allStudents.stream().map(student->studentLocationRepository.findFirstByStudentIdOrderByTimeStampDesc(student.getId())).filter(sLocation-> sLocation != null).toList();
    }
    ///////////////////////בונוס///////////////////////
    //חישוב מרחק על כדור הארץ ע"פ נוסחת אברסין

    private double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lngDistance = Math.toRadians(lng2 - lng1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        return R * c;
    }


    public List<Student> getDistantStudents(double teacherLat, double teacherLon) {
        List<StudentLocation> locations = getStudentLocations();

        List<String> distantStudentIdsMore3 = locations.stream()
                .filter(loc -> calculateDistance(teacherLat, teacherLon, loc.getLatitude(), loc.getLongitude()) >= 3)
                .map(StudentLocation::getStudentId)
                .toList();
        return StudentRepository.findAllById(distantStudentIdsMore3);
    }
}
