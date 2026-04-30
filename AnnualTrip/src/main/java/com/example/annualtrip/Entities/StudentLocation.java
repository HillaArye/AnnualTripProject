package com.example.annualtrip.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class StudentLocation {
    @Id
    @GeneratedValue
    private Long id;
    private String studentId;
    private double latitude;
    private double longitude;
    private LocalDateTime timeStamp;

}
