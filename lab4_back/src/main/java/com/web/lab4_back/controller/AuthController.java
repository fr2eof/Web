package com.web.lab4_back.controller;

import com.web.lab4_back.dto.request.LoginUserDTO;
import com.web.lab4_back.dto.request.LogoutUserDTO;
import com.web.lab4_back.dto.request.SignupUserDTO;
import com.web.lab4_back.dto.response.AuthResponseDTO;
import com.web.lab4_back.exception.InvalidCredentialsException;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.exception.UserExistsException;
import com.web.lab4_back.exception.UserNotFoundException;
import com.web.lab4_back.service.impl.AuthServiceImpl;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Path("/auth")
public class AuthController {
    @Inject
    private AuthServiceImpl authService;

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signup(@Valid SignupUserDTO signupUserDTO) {
        try {
            String[] idAndHashedTokens = authService.signupUser(signupUserDTO.getUsername(), signupUserDTO.getPassword(), signupUserDTO.getEmail());
            AuthResponseDTO authResponse = new AuthResponseDTO(idAndHashedTokens[0], idAndHashedTokens[1], idAndHashedTokens[2]);

            return Response.ok().entity(authResponse).build();
        } catch (UserExistsException e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
        } catch (ServerException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@Valid LoginUserDTO loginUserDTO) {
        try {
            String[] idAndHashedTokens = authService.loginUser(loginUserDTO.getUsername(), loginUserDTO.getPassword());
            AuthResponseDTO authResponse = new AuthResponseDTO(idAndHashedTokens[0], idAndHashedTokens[1], idAndHashedTokens[2]);

            return Response.ok(authResponse).build();
        } catch (UserNotFoundException | InvalidCredentialsException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (ServerException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@Valid LogoutUserDTO logoutUserDTO) {
        try {
            authService.logoutUser(logoutUserDTO.getUsername(), logoutUserDTO.getPassword());
            return Response.ok("User logged out successfully").build();
        } catch (UserNotFoundException | InvalidCredentialsException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }
}