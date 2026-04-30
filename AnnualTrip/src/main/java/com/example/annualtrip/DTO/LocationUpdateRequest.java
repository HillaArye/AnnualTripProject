package com.example.annualtrip.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationUpdateRequest {
    private String id;
    private CoordinatesDTO coordinates;
    private String time;
}