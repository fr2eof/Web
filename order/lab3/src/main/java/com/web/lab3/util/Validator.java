package com.web.lab3.util;

public class Validator {
    public static boolean checkPointInArea(float x, float y, float R) {
        if (x <= 0.0f && y >= 0.0f && y <= R + 2 * x) {
            return true;
        } else if (x >= 0.0f && y <= 0.0f && (x * x + y * y <= (R / 2) * (R / 2)) ){
            return true;
        } else return x >= 0.0f && y >= 0.0f && x <= R / 2 && y <= R;
    }
}
