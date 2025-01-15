package com.web.lab4_back.controller;

import com.web.lab4_back.dto.request.PointDTO;
import com.web.lab4_back.dto.response.PointResponseDTO;
import com.web.lab4_back.entity.Point;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.exception.UserNotFoundException;
import com.web.lab4_back.service.AreaCheckService;
import com.web.lab4_back.service.PointService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Slf4j
@Path("/point")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PointController {

    @Inject
    PointService pointService;

    @Inject
    AreaCheckService areaCheckService;

    @POST
    @Path("/add")
    public Response addPoint(@Valid PointDTO pointDTO) {
        try {
            validatePointDTO(pointDTO);

            boolean inArea = areaCheckService.isInArea(pointDTO.getX(), pointDTO.getY(), pointDTO.getR());
            pointDTO.setInArea(inArea);

            pointService.savePoint(pointDTO.getUserId(), pointDTO.getX(), pointDTO.getY(), pointDTO.getR(), pointDTO.isInArea());

            log.info("Point added successfully: {}", pointDTO);

            PointResponseDTO pointResponse = new PointResponseDTO(inArea);
            return Response.ok(pointResponse).build();
        } catch (IllegalArgumentException e) {
            log.error("Invalid input data: {}", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        } catch (UserNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (ServerException e) {
            log.error("Server error: {}", e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/all/{userId}")
    public Response getAllPoints(@PathParam("userId") Long userId) {
        try {
            List<Point> points = pointService.getAllPointsById(userId);

            log.info("Retrieved {} points for user ID: {}", points.size(), userId);

            return Response.ok(points).build();
        } catch (UserNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (ServerException e) {
            log.error("Server error: {}", e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/delete/{userId}")
    public Response deletePoints(@PathParam("userId") Long userId) {
        try {
            pointService.deletePointsByUserId(userId);

            log.info("Deleted all points for user ID: {}", userId);

            return Response.ok().build();
        } catch (UserNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }


    //    GET /point/all/123?page=0&size=10
    @GET
    @Path("/all/{userId}")
    public Response getAllPoints(
            @PathParam("userId") Long userId,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size
    ) {
        try {
            List<Point> points = pointService.getAllPointsById(userId, page, size);

            log.info("Retrieved {} points for user ID: {} (page: {}, size: {})", points.size(), userId, page, size);

            return Response.ok(points).build();
        } catch (UserNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        } catch (IllegalArgumentException e) {
            log.error("Invalid input data: {}", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    private void validatePointDTO(@NotNull PointDTO pointDTO) throws IllegalArgumentException {
        if (pointDTO.getX() == null || pointDTO.getY() == null || pointDTO.getR() == null) {
            throw new IllegalArgumentException("X, Y, and R must not be null");
        }
        if (pointDTO.getR() <= 0) {
            throw new IllegalArgumentException("R must be greater than 0");
        }
    }
}