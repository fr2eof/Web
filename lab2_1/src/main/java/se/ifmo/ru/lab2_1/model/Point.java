package se.ifmo.ru.lab2_1.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record Point(float x, float y, int r, LocalDateTime currentTime, long execTime, boolean shot) implements Serializable {
    public Point(float x, float y, int r, long execTime, boolean shot) {
        this(x, y, r, LocalDateTime.now(), execTime, shot);
    }
    public String getCurrentTime() {
        return currentTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
}