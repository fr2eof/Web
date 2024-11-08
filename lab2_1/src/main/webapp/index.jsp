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
    <title>ангар</title>

    <link rel="stylesheet" href="style/index.css?v=2">
    <link rel="stylesheet" href="style/toast.css?v=2">

    <script defer src="./js_scripts/index.js?v=2"></script>
    <script defer src="./js_scripts/toast.js?v=2"></script>

</head>
<body>
<header>
    <div class="header">
        <span class="gear-icon"></span>
        <span class="nickname">ya_v_tanke_228</span>
        <span id="premium">Премиум аккаунт</span>
        <a href="https://na.wargaming.net/shop/wot/halloween/">Магазин</a>
        <button id="vzvod">Сформировать взвод</button>
        <button id="v_boy">В бой!</button>
        <select id="mode">
            <option>Случайный бой</option>
            <option>Рейтинговый бой</option>
            <option>Свободный бой</option>
        </select>
        <div class="currency">
            <span class="gold">Золото:
                129</span>
            <span class="silver">Серебро:
                1 929 213</span>
            <span class="free-xp">Свободный опыт:
                23 456</span>
        </div>
    </div>
</header>
<main>
    <div class="tank-container">
        <div class="tank-container">
            <button class="tank-item tank-1" onclick=handleTankClick("t-34-85")></button>
            <button class="tank-item tank-2" onclick=handleTankClick('maus')></button>
            <button class="tank-item tank-3" onclick=handleTankClick('bz-75')></button>
        </div>
    </div>
    <div id="toast">
        <img id="img" src="media/toast_icon.jpg" alt="">
        <div id="desc"></div>
    </div>
</main>
</body>
</html>