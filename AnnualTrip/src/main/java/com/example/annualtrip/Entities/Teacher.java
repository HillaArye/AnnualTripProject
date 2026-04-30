package com.example.annualtrip.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Teacher {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String grade;
}
