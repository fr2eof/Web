package se.ifmo.ru;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.logging.Logger;

import com.fastcgi.FCGIInterface;

import static se.ifmo.ru.JsonResponse.BAD_REQUEST_TEMPLATE;
import static se.ifmo.ru.JsonResponse.INTERNAL_SERVER_ERROR_TEMPLATE;

public class App {

    private static final Logger log = Logger.getLogger(App.class.getName());

    public static void main(String[] args) {
        log.info("App started");
        while (new FCGIInterface().FCGIaccept() >= 0) {
            log.info("while");
            try {
                String stringContentLength = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
                int contentLength = (stringContentLength != null) ? Integer.parseInt(stringContentLength) : 0;
                if (contentLength > 0) {
                    log.info("content length: " + contentLength);
                    long startTime = System.currentTimeMillis();
                    byte[] buffer = new byte[contentLength];
                    InputStream fcgiInputStream = FCGIInterface.request.inStream;
                    int bytesRead = fcgiInputStream.read(buffer, 0, contentLength);
                    if (bytesRead == -1) {
                        JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                        continue;
                    }
                    String requestBody = new String(buffer, StandardCharsets.UTF_8);
                    HashMap<String, String> params;
                    try {
                        params = JsonWorker.parseJsonBody(requestBody);
                    } catch (IOException e) {
                        JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                        continue;
                    }

                    float xValue = Float.parseFloat(params.get("x"));
                    float yValue = Float.parseFloat(params.get("y"));
                    float rValue = Float.parseFloat(params.get("r"));
                    if (Validate.validate(xValue, yValue, rValue)) {
                        boolean shot = Validate.checkPointInArea(xValue, yValue, rValue);
                        log.info("shot " + shot);
                        JsonWorker.sendJson(startTime, shot);
                    } else {
                        JsonWorker.sendJson(INTERNAL_SERVER_ERROR_TEMPLATE);
                    }
                } else {
                    JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                }
            } catch (Exception e) {
                log.info(e.getMessage());
                JsonWorker.sendJson(INTERNAL_SERVER_ERROR_TEMPLATE);
            }
        }
    }
}