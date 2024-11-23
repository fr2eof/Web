<%--
  Created by IntelliJ IDEA.
  User: fr2eof
  Date: 25.10.2024
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="jstl" %>
<%--заменил стандартный тег--%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script defer src="js_scripts/table.js?v=2"></script>
    <title>выстрел!</title>
    <link rel="stylesheet" href="./style/answer.css">
</head>
<body>
<main class="container">
    <a href="playGround.jsp">ЕХАЛО!</a>

    <section class="results">
        <table id="result-table">
            <thead>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>r</th>
                <th>result</th>
                <th>execTime</th>
            </tr>
            </thead>
            <tbody>
            <jstl:forEach var="point" items="${points}">
                <tr>
                    <td>${point.x}</td>
                    <td>${point.y}</td>
                    <td>${point.r}</td>
                    <td>${point.shot ? 'ЕСТЬ ПРОБИТИЕ' : 'НЕ ПРОБИЛ'}</td>
                    <td>${point.execTime} ns</td>
                </tr>
            </jstl:forEach>
            </tbody>
        </table>
    </section>

</main>
</body>
</html>