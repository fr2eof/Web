package com.web.lab4_back.controller;

import com.web.lab4_back.service.ImageService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import java.io.IOException;
import java.io.InputStream;

@Path("/images")
public class ProfileImageController {
    @Inject
    private ImageService imageService;

    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.TEXT_PLAIN)
    public Response uploadImage(
            @FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) {

        try {
            String imagePath = imageService.uploadImage(fileInputStream, fileDetail.getFileName());
            return Response.ok("Image uploaded successfully: " + imagePath).build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Failed to upload image")
                    .build();
        }
    }

    @GET
    @Path("/{imagePath}")
    @Produces("image/jpeg")
    public Response getImage(@PathParam("imagePath") String imagePath) {
        try {
            InputStream imageStream = imageService.getImage(imagePath);
            return Response.ok(imageStream).build();
        } catch (IOException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("/{imagePath}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteImage(@PathParam("imagePath") String imagePath) {
        try {
            imageService.deleteImage(imagePath);
            return Response.ok("Image deleted successfully").build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Failed to delete image")
                    .build();
        }
    }
}
