package se.ifmo.ru;

import java.util.logging.Logger;

public class Validate {
    private static final Logger log = Logger.getLogger(Validate.class.getName());

    protected static boolean validate(float x, float y, float r) {
        return x >= -2.0f && x <= 2.0f && y >= -5.0f && y <= 3.0f && r >= 1.0f && r <= 4.0f;
    }

    protected static boolean checkPointInArea(float x, float y, float R) {
        if (x <= 0 && y >= 0 && y <= R + x) {
            return true;
        } else if (x >= 0 && y >= 0 && (x * x + y * y <= R * R)) {
            return true;
        } else return x >= 0 && y <= 0 && x <= R && y >= -R/2;
    }
}
