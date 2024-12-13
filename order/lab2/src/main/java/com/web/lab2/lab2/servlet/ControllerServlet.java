package se.ifmo.ru.lab2_1.servlet;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.logging.Logger;

import static se.ifmo.ru.lab2_1.validation.Validate.validRequestParams;


@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(ControllerServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String xParam = request.getParameter("x");
        String[] yParams = request.getParameterValues("y");
        String rParam = request.getParameter("r");
        if (!validRequestParams(xParam, yParams, rParam)) {
            log.warning("Invalid request parameters: x=" + xParam + ", y=" + Arrays.toString(yParams) + ", r=" + rParam);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request parameters");
            return;
        }
        ServletContext context = getServletContext();
        context.getNamedDispatcher("areaCheck").forward(request, response);
    }
}