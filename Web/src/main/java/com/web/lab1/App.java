package com.web;

import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.logging.Logger;

import static com.web.JsonResponse.BAD_REQUEST_TEMPLATE;
import static com.web.JsonResponse.INTERNAL_SERVER_ERROR_TEMPLATE;

public class App {

    private static final Logger log = Logger.getLogger(App.class.getName());

    public static void main(String[] args) {
        log.info("App started");
        //стандартный запуск
        while (new FCGIInterface().FCGIaccept() >= 0) {
            try {
                //получение параметра "длина контента"
                String stringContentLength = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
                //перевод его в инт
                int contentLength = (stringContentLength != null) ? Integer.parseInt(stringContentLength) : 0;

                if (contentLength > 0) {
                    long startTime = System.currentTimeMillis();
                    byte[] buffer = new byte[contentLength];
                    InputStream fcgiInputStream = FCGIInterface.request.inStream;
                    //считывание в массив байтов наш запрос
                    int bytesRead = fcgiInputStream.read(buffer, 0, contentLength);
                    if (bytesRead == -1) {
                        JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                        continue;
                    }
                    //перевод из байтов в строку
                    String requestBody = new String(buffer, StandardCharsets.UTF_8);
                    HashMap<String, String> params;
                    try {
                        params = JsonWorker.parseJsonBody(requestBody);
                    } catch (IOException e) {
                        JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                        continue;
                    }
                    //получение и парсинг наших параметров
                    float xValue = Float.parseFloat(params.get("x"));
                    float yValue = Float.parseFloat(params.get("y"));
                    float rValue = Float.parseFloat(params.get("r"));
                    //отправка на валидацию
                    if (Validate.validate(xValue, yValue, rValue)) {
                        //проверка на попадание
                        boolean shot = Validate.checkPointInArea(xValue, yValue, rValue);
                        //передача данных в метод на отправку
                        JsonWorker.sendJson(startTime, shot);
                    } else {
                        JsonWorker.sendJson(INTERNAL_SERVER_ERROR_TEMPLATE);
                    }
                } else {
                    JsonWorker.sendJson(BAD_REQUEST_TEMPLATE);
                }
            } catch (Exception e) {
                JsonWorker.sendJson(INTERNAL_SERVER_ERROR_TEMPLATE);
            }
        }
    }
}