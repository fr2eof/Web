package com.web.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Point")
@Getter
@Setter
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double x;
    private double y;
    private double r;
    private boolean insideArea;
    private Date requestTime;
    private long executionTime;

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

}
