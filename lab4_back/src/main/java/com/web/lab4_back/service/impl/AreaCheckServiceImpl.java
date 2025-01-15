package com.web.lab4_back.service.impl;

import com.web.lab4_back.service.AreaCheckService;
import jakarta.ejb.Stateless;

@Stateless
public class AreaCheckServiceImpl implements AreaCheckService {
    @Override
    public boolean isInArea(double x, double y, double r) {
        if ((x * x + y * y <= r * r) && (x <= 0 && y >= 0)) {
            return true;
        } else if ((x >= 0 && x <= r) && (y >= 0 && y <= r)) {
            return true;
        } else {
            return (x >= 0 && y <= 0) && (y >= x / 2 - r / 2);
        }
    }
}