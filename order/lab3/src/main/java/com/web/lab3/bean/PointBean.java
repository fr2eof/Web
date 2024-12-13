package com.web.lab3.bean;

import com.google.gson.Gson;
import com.web.lab3.dao.DataBaseManager;
import com.web.lab3.entity.Point;
import com.web.lab3.util.Validator;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Named("pointBean")
@SessionScoped
@Data
public class PointBean implements Serializable {
    private float x;
    private float y;
    private float[] r;
    private boolean wasClick;
    private float clickX;
    private float clickY;
    private String requestTime;

    private ArrayList<Point> pointsArrayList;
    private DataBaseManager dbManager;

    @PostConstruct
    public void init() {
        dbManager = DataBaseManager.getInstance();
        pointsArrayList = dbManager.getAllPoints();
        if (pointsArrayList == null) {
            pointsArrayList = new ArrayList<>();
        }
    }
    public void checkPoint() {
        for (float radius : r) {
            double start = System.nanoTime();
            Point point;
            boolean inside;
            if (!wasClick) {
                System.out.println("x: " + x + " y: " + y + " radius: " + radius);
                inside = Validator.checkPointInArea(x, y, radius);
                point = new Point(x, y, radius);
            } else {
                System.out.println("x: " + clickX + " y: " + clickY + " radius: " + radius);
                inside = Validator.checkPointInArea(clickX, clickY, radius);
                point = new Point(clickX, clickY, radius);
            }
            point.setRequestTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            point.setInsideArea(inside);
            double end = System.nanoTime();
            point.setExecutionTime((end - start) / 1_000_000);

            try {
                dbManager.savePoint(point);
                pointsArrayList.add(point);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add("handleResponse(null, {error: '" + e.getMessage() + "'});");
            }
        }
    }
    public String getPointsAsJson() {
        Gson gson = new Gson();
        return gson.toJson(pointsArrayList);
    }
    public String clearTable() {
        pointsArrayList.clear();
        dbManager.clearAllPoints();
        return null;
    }
}