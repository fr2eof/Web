<%--
  Created by IntelliJ IDEA.
  User: fr2eof
  Date: 25.10.2024
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>поле боя</title>
    <link rel="stylesheet" href="style/playGround.css?v=1">
    <link rel="stylesheet" href="style/toast.css?v=2">

    <script defer src="js_scripts/toast.js?v=2"></script>
    <script defer src="js_scripts/graph.js?v=2"></script>
    <script defer src="js_scripts/playGround.js?v=2"></script>
</head>

<body>
<header>
    <h1>мир танков <br>и не только</h1>
    <div class="student-info">
        Student: Ivanov Ilya<br>
        Group: P3217<br>
        Variant: 51259
    </div>
</header>
<div class="video-background">
    <video autoplay muted loop id="myVideo">
        <source src="./media/picture/background/videoplayback.mp4" type="video/mp4">
    </video>
</div>
<main>
    <div class="content-container">
        <canvas class="horizontal" id="canvas"></canvas>
        <form class="horizontal" action="${pageContext.request.contextPath}/controller" method="POST" id="pointForm">

            <label for="x">X coordinate:</label>
            <input type="text" id="x" name="x" required pattern="[+-]?(\d+\.*\d*)" min="-5" max="5"
                   placeholder="Enter a number from -5.0 to 5.0">

            <label for="y">Y coordinate:</label>
            <div class="checkbox-group" id="y">
                <div class="checkbox-item">
                    <label for="checkbox-1">-3</label>
                    <input type="checkbox" id="checkbox-1" name="y" value="-3">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-2">-2</label>
                    <input type="checkbox" id="checkbox-2" name="y" value="-2">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-3">-1</label>
                    <input type="checkbox" id="checkbox-3" name="y" value="-1">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-4">0</label>
                    <input type="checkbox" id="checkbox-4" name="y" value="0">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-5">1</label>
                    <input type="checkbox" id="checkbox-5" name="y" value="1">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-6">2</label>
                    <input type="checkbox" id="checkbox-6" name="y" value="2">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-7">3</label>
                    <input type="checkbox" id="checkbox-7" name="y" value="3">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-8">4</label>
                    <input type="checkbox" id="checkbox-8" name="y" value="4">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-9">5</label>
                    <input type="checkbox" id="checkbox-9" name="y" value="5">
                </div>
                <div class="checkbox-item">
                    <label for="checkbox-custom-y">Custom</label>
                    <input type="checkbox" id="checkbox-custom-y" name="y" disabled>
                </div>
            </div>

            <label for="r">Radius:</label>
            <div class="radio-group" id="r">
                <div class="radio-item">
                    <label for="radio-1">1</label>
                    <input type="radio" id="radio-1" name="r" value="1">
                </div>
                <div class="radio-item">
                    <label for="radio-2">2</label>
                    <input type="radio" id="radio-2" name="r" value="2">
                </div>
                <div class="radio-item">
                    <label for="radio-3">3</label>
                    <input type="radio" id="radio-3" name="r" value="3">
                </div>
                <div class="radio-item">
                    <label for="radio-4">4</label>
                    <input type="radio" id="radio-4" name="r" value="4">
                </div>
                <div class="radio-item">
                    <label for="radio-5">5</label>
                    <input type="radio" id="radio-5" name="r" value="5">
                </div>
            </div>

            <button id="checkButton" type="submit">ВЫСТРЕЛ!</button>

        </form>
        <div class="table-container"></div>
    </div>
    <div id="toast">
        <img id="img" src="media/toast_icon.jpg" alt="">
        <div id="desc"></div>
    </div>
</main>
</body>
</html>