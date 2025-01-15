package com.web.lab4_back.filter.jwt;

import com.web.lab4_back.exception.InvalidTokenException;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.service.TokenService;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
@Priority(Priorities.AUTHENTICATION)
public class JwtFilter implements ContainerRequestFilter {

    @Inject
    private TokenService tokenService;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        try {
            String path = requestContext.getUriInfo().getPath();
            log.info("Processing request to: {}", path);

            // Пропускаем публичные эндпоинты
            if (path.contains("auth/signup") || path.contains("auth/login")) {
                log.info("Skipping JWT validation for: {}", path);
                return;
            }

            String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                log.warn("Missing or invalid Authorization header for: {}", path);
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                        .entity("Missing or invalid Authorization header")
                        .build());
                return;
            }

            String token = authorizationHeader.substring("Bearer ".length()).trim();

            if (!tokenService.validateToken(token)) {
                log.warn("Invalid JWT token for: {}", path);
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                        .entity("Invalid or expired JWT token")
                        .build());
                return;
            }

            Long userId = tokenService.getUserIdFromToken(token);

            if (userId == null) {
                log.warn("Invalid JWT token (missing userId) for: {}", path);
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                        .entity("Invalid JWT token (missing userId)")
                        .build());
                return;
            }

            requestContext.setProperty("userId", userId);

            log.info("JWT token validated successfully for: {}", path);
        } catch (InvalidTokenException e) {
            log.warn("Invalid token: {}", e.getMessage());
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(e.getMessage())
                    .build());
        } catch (ServerException e) {
            log.error("Server error: {}", e.getMessage(), e);
            requestContext.abortWith(Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Internal server error")
                    .build());
        } catch (Exception e) {
            log.error("Unexpected error in JwtFilter: {}", e.getMessage(), e);
            requestContext.abortWith(Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Unexpected error")
                    .build());
        }
    }
}