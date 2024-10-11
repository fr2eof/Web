package se.ifmo.ru;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonResponse {
    public static final String RESPONSE_TEMPLATE = "HTTP/1.1 200 OK\n" +
            "Content-Type: application/json\n" +
            "Content-Length: %d\n" +
            "\n%s";
    public static final String NOT_FOUND_TEMPLATE = "HTTP/1.1 404 Not Found\n" +
            "Content-Type: text/plain; charset=UTF-8\n" +
            "Content-Length: %d\n" +
            "\nResource not found";
    public static final String INTERNAL_SERVER_ERROR_TEMPLATE = "HTTP/1.1 500 Internal Server Error\n" +
            "Content-Type: text/plain; charset=UTF-8\n" +
            "Content-Length: %d\n" +
            "\nInternal server error occurred";
    public static final String BAD_REQUEST_TEMPLATE = "HTTP/1.1 400 Bad Request\n" +
            "Content-Type: application/json\n" +
            "Content-Length: %d\n" +
            "\nBad request";
    @JsonProperty
    private boolean shot;
    @JsonProperty
    private long executionTime;

    public JsonResponse(boolean shot, long executionTime) {
        this.shot = shot;
        this.executionTime = executionTime;
    }

    public boolean getShot() {
        return shot;
    }

    public long getExecutionTime() {
        return executionTime;
    }
}
