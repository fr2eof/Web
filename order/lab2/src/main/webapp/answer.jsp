<%@ page import="se.ifmo.ru.lab2_1.model.PointsStorage" %>
<%@ page import="se.ifmo.ru.lab2_1.model.Point" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="en">
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <script defer src="js_scripts/table.js?v=2"></script>
    <title>выстрел!</title>
    <link rel="stylesheet" href="./style/answer.css?v=2">
</head>
<body>
<main class="content-container">

</main>
<div class="button-container">
    <button onclick="prevPage()">Previous</button>
    <button onclick="nextPage()">Next</button>
</div>
<a href="playGround.jsp">ЕХАЛО!</a>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const data = [
            <%
                PointsStorage storage = (PointsStorage) session.getAttribute("tableData");
                if (storage != null) {
                    for (Point point : storage.getPoints()) {
                        String currentTime = String.valueOf(point.getCurrentTime());
            %>
            {
                x: <%= point.x() %>,
                y: <%= point.y() %>,
                r: <%= point.r() %>,
                hit: <%= point.shot()%>,
                currentTime: "<%= currentTime %>",
                executedTime: "<%= point.execTime() %>"
            },
            <%
                    }
                }
            %>
        ];

        data.forEach(item => {
            addResultToTable(item.x, item.y, item.r, item.hit === true, item.currentTime, item.executedTime);
        });
    });
</script>

</body>
</html>
