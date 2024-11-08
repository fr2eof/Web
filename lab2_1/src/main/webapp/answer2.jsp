<%--
  Created by IntelliJ IDEA.
  User: fr2eof
  Date: 25.10.2024
  Time: 16:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script defer src="js_scripts/table.js?v=2"></script>
    <title>выстрел!</title>
    <link rel="stylesheet" href="./style/answer.css">
</head>
<body>
<main>
    <button id="showResults">ПОПАЛ?</button>
    <a href="playGround.jsp">ЕХАЛО!</a>
    <div class="button-container">
        <button onclick="prevPage()">Previous</button>
        <button onclick="nextPage()">Next</button>
        <button onclick="clearTableData()">Clear</button>
    </div>

</main>
</body>
</html>