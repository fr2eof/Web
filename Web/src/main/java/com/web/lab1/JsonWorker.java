package com.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import static com.web.JsonResponse.BAD_REQUEST_TEMPLATE;
import static com.web.JsonResponse.RESPONSE_TEMPLATE;

public class JsonWorker {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    protected static HashMap<String, String> parseJsonBody(String body) throws IOException {
        JsonNode jsonNode = objectMapper.readTree(body);
        // парсинг в HashMap<String, String>
        return objectMapper.convertValue(jsonNode, objectMapper.getTypeFactory().constructParametricType(HashMap.class, String.class, String.class));
    }

    protected static void sendJson(long startTime, boolean shot) {
        try {
            long currentTime = System.currentTimeMillis();
            long executionTime = currentTime - startTime;

            JsonResponse response = new JsonResponse(shot, executionTime);

            //упавкова данных для ответа
            String responseJson = objectMapper.writeValueAsString(response);

            //формирование успешного ответа с помощью уже готового шаблона и его отправка
            System.out.printf((RESPONSE_TEMPLATE) + "%n", responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson);
        } catch (IOException ex) {
            //формирование ответа-ошибку с помощью уже готового шаблона
            System.out.printf((BAD_REQUEST_TEMPLATE) + "%n", BAD_REQUEST_TEMPLATE.getBytes(StandardCharsets.UTF_8).length);
        }
    }
    //метод для отправки шаблонов с ошибками
    protected static void sendJson(String jsonDump) {
        System.out.printf(jsonDump, jsonDump.getBytes(StandardCharsets.UTF_8).length);
    }
}