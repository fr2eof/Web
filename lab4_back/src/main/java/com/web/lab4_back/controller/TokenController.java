package com.web.lab4_back.controller;

import com.web.lab4_back.dto.response.AuthResponseDTO;
import com.web.lab4_back.exception.InvalidTokenException;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.service.TokenService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/token")
public class TokenController {

    @Inject
    private TokenService tokenService;

    @POST
    @Path("/refresh")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response refreshToken(@FormParam("refreshToken") String refreshToken) {
        try {
            log.info("Refreshing token for refresh token: {}", refreshToken);

            String newAccessToken = tokenService.refreshToken(refreshToken);

            AuthResponseDTO authResponse = new AuthResponseDTO(newAccessToken);
            return Response.ok(authResponse).build();
        } catch (InvalidTokenException e) {
            log.warn("Invalid refresh token: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (ServerException e) {
            log.error("Failed to refresh token: {}", e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/validate")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateToken(@FormParam("token") String token) {
        try {
            log.info("Validating token: {}", token);

            boolean isValid = tokenService.validateToken(token);

            return Response.ok(isValid).build();
        } catch (InvalidTokenException e) {
            log.warn("Invalid token: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (ServerException e) {
            log.error("Failed to validate token: {}", e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}