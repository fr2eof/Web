package se.ifmo.ru.lab2_1.model;

import java.time.LocalDateTime;

public class Point {
    private float x;
    private float y;
    private int r;
    private LocalDateTime currentTime;
    private long execTime;
    private boolean shot;

    public Point(float x, float y, int r, long execTime, boolean shot) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = LocalDateTime.now();
        this.execTime = execTime;
        this.shot = shot;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public LocalDateTime getCurrentTime() {
        return currentTime;
    }

    public long getExecTime() {
        return execTime;
    }

    public boolean isShot() {
        return shot;
    }
}