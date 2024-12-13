package com.web.lab3.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "point")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float x;

    private float y;

    private float r;

    private boolean insideArea;

    private String requestTime;

    private double executionTime;

    public Point(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
