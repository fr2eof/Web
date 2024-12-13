package com.web;

public class Validate {
    //метод для валидации параметров
    protected static boolean validate(float x, float y, float r) {
        return x >= -4.0f && x <= 4.0f && y >= -3.0f && y <= 5.0f && r >= 1.0f && r <= 3.0f;
    }

    //метод проверки на попадние
    protected static boolean checkPointInArea(float x, float y, float R) {
        if (x >= 0 && y <= 0 && y >= R + x) {
            return true;
        } else if (x >= 0 && y >= 0 && (x * x + y * y <= R / 2 * R / 2)) {
            return true;
        } else return x <= 0 && y <= 0 && x <= R && y >= -R / 2;
    }
}
