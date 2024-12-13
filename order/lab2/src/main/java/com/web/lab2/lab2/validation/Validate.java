package se.ifmo.ru.lab2_1.validation;

import java.util.logging.Logger;

public class Validate {

    private static final Logger log = Logger.getLogger(Validate.class.getName());


    public static boolean checkPointInArea(float x, float y, int R) {
        if (x <= 0 && y >= 0 && y <= R + x) {
            return true;
        } else if (x <= 0 && y <= 0 && (x * x + y * y <= (float) (R / 2 * R) / 2)) {
            return true;
        } else return x >= 0 && y <= 0 && x <= R && y >= (float) -R / 2;
    }

    public static boolean validRequestParams(String xParam, String[] yParam, String rParam) {
        return !((xParam == null || yParam == null || rParam == null) || (xParam.isEmpty() || yParam.length == 0 || rParam.isEmpty()));
    }
}
