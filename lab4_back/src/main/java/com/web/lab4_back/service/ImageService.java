package com.web.lab4_back.service;

import java.io.IOException;
import java.io.InputStream;

public interface ImageService {
    String uploadImage(InputStream imageStream, String fileName) throws IOException;
    void deleteImage(String imagePath) throws IOException;
    InputStream getImage(String imagePath) throws IOException;
}