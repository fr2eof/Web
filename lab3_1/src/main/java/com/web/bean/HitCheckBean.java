package com.web.bean;

import com.web.entity.Point;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Named
@SessionScoped
@Data
public class HitCheckBean implements Serializable {
    private double x;
    private double y;
    private double r;
    private List<Point> results;

//    @Inject
//    private HitCheckService service;
//
//    public void checkPoint() {
//        boolean inside = service.isInside(x, y, r);
//        service.saveResult(x, y, r, inside);
//        results = service.getAllResults();
//    }

}
