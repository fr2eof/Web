package se.ifmo.ru;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.logging.Logger;

import static se.ifmo.ru.JsonResponse.BAD_REQUEST_TEMPLATE;
import static se.ifmo.ru.JsonResponse.RESPONSE_TEMPLATE;

public class JsonWorker {
    private static final Logger log = Logger.getLogger(JsonWorker.class.getName());
    private static final ObjectMapper objectMapper = new ObjectMapper();

    protected static HashMap<String, String> parseJsonBody(String body) throws IOException {
        JsonNode jsonNode = objectMapper.readTree(body);
        return objectMapper.convertValue(jsonNode, objectMapper.getTypeFactory().constructParametricType(HashMap.class, String.class, String.class));
    }

    protected static void sendJson(long startTime, boolean shot) {
        try {
            long currentTime = System.currentTimeMillis();
            long executionTime = currentTime - startTime;

            JsonResponse response = new JsonResponse(shot, executionTime);

            String responseJson = objectMapper.writeValueAsString(response);
            //log.info(responseJson);

            String res = String.format((RESPONSE_TEMPLATE) + "%n", responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson);
            log.info(res);
            System.out.printf((RESPONSE_TEMPLATE) + "%n", responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson);
        } catch (IOException ex) {
            String res = String.format((BAD_REQUEST_TEMPLATE) + "%n", BAD_REQUEST_TEMPLATE.getBytes(StandardCharsets.UTF_8).length);
            log.warning(res);

            System.out.printf((BAD_REQUEST_TEMPLATE) + "%n", BAD_REQUEST_TEMPLATE.getBytes(StandardCharsets.UTF_8).length);
        }
    }

    protected static void sendJson(String jsonDump) {
        System.out.printf(jsonDump, jsonDump.getBytes(StandardCharsets.UTF_8).length);
    }
}