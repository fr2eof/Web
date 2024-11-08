package se.ifmo.ru.lab2_1.servlet;

import se.ifmo.ru.lab2_1.model.Point;
import se.ifmo.ru.lab2_1.model.PointsStorage;
import se.ifmo.ru.lab2_1.validation.Validate;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.logging.Logger;

@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(AreaCheckServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            String[] yParams = request.getParameterValues("y");
            int r = Integer.parseInt(request.getParameter("r"));

            for (String yParam : yParams) {
                float y = Float.parseFloat(yParam);
                long startTime = System.currentTimeMillis();
                boolean shot = Validate.checkPointInArea(x, y, r);
                long endTime = System.currentTimeMillis();
                long executionTime = endTime - startTime;

                HttpSession session = request.getSession();

                var point = new Point(x, y, r, executionTime, shot);
                var tableData = (PointsStorage) session.getAttribute("tableData");
                if (tableData == null) {
                    tableData = new PointsStorage();
                    session.setAttribute("tableData", tableData);
                }
                tableData.addPoint(point);
                request.getRequestDispatcher("./answer.jsp").forward(request, response);
            }
        } catch (NumberFormatException | NullPointerException | IllegalStateException e) {
            log.warning(e.getMessage());
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request parameters");
        }
    }
}