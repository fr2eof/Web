<%--
  Created by IntelliJ IDEA.
  User: fr2eof
  Date: 25.10.2024
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="se.ifmo.ru.lab2_1.model.PointsStorage" %>
<%@ page import="se.ifmo.ru.lab2_1.model.Point" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script defer src="js_scripts/table.js?v=2"></script>
    <title>выстрел!</title>
    <link rel="stylesheet" href="./style/answer.css">
</head>
<body>
<main class="container">
    <button id="showResults">ПОПАЛ?</button> <a href="playGround.jsp">ЕХАЛО!</a>
    <div class="button-container">
    <button onclick="prevPage()">Previous</button>
    <button onclick="nextPage()">Next</button>
    <button onclick="clearTableData()">Clear</button>
    </div>

    <section class="results">
        <table id="result-table">
            <thead>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>r</th>
                <th>result</th>
            </tr>
            </thead>
            <tbody>
            <%
                PointsStorage storage = (PointsStorage) session.getAttribute("tableData");
                if (storage != null) {
                    for (Point point : storage.getPoints()) {
            %>
            <tr>
                <td>
                    <%= point.x() %>
                </td>
                <td>
                    <%= point.y() %>
                </td>
                <td>
                    <%= point.r() %>
                </td>
                <td>
                    <%= point.shot() ? "ЕСТЬ ПРОБИТИЕ" : "НЕ ПРОБИЛ" %>
                </td>
            </tr>
            <%
                    }
                }
            %>
            </tbody>
        </table>
    </section>
</main>
</body>
</html>