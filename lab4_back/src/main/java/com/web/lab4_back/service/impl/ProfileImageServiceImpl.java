package com.web.lab4_back.service.impl;

import com.web.lab4_back.service.ImageService;
import jakarta.ejb.Stateless;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Stateless
public class ProfileImageServiceImpl implements ImageService {
    private static final String UPLOAD_DIR = "/uploads/profile/images/";

    @Override
    public String uploadImage(InputStream imageStream, String fileName) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String uniqueFileName = UUID.randomUUID() + "_" + fileName;
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(imageStream, filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
    }

    @Override
    public void deleteImage(String imagePath) throws IOException {
        Path filePath = Paths.get(imagePath);
        Files.deleteIfExists(filePath);
    }

    @Override
    public InputStream getImage(String imagePath) throws IOException {
        Path filePath = Paths.get(imagePath);
        return new FileInputStream(filePath.toFile());
    }
}