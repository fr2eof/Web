let backgroundMusic = document.createElement('audio');
let vBoyMusic = document.createElement('audio');
vBoyMusic.src = './media/soundtracks/boy.mp3';
let play = false;

function handleTankClick(tankName) {
    let backgroundImageUrl;
    if (tankName === "bz-75") {
        backgroundImageUrl = "url('./media/picture/background/chineseBackground.png')";
        play = true;
    } else if (tankName === "maus") {
        backgroundImageUrl = "url('./media/picture/background/germanBackground.png')";
        play = true;
    } else if (tankName === "t-34-85") {
        backgroundImageUrl = "url('./media/picture/background/sovetBackground.png')";
        play = true;
    }

    document.body.style.backgroundImage = backgroundImageUrl;
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

window.addEventListener('load', () => {
    document.body.style.backgroundImage = "url('./media/picture/background/wot_artboard.png')";
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    backgroundMusic.src = './media/soundtracks/intro.mp3';
    backgroundMusic.loop = true;
    document.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch((error) => {
                console.log('Ошибка при воспроизведении музыки:', error);
            });
        }
    }, {once: true});
    document.body.querySelector('#vzvod').addEventListener('click', () => {
        launch_toast("У тебя нет друзей")
    });
    document.body.querySelector('#v_boy').addEventListener('click', () => {
        if (play === true) {
            vBoyMusic.play();
            vBoyMusic.addEventListener('ended', () => {
                document.location = './playGround.jsp'
            });
        } else {
            launch_toast("Выбери свою машину уничтожения")
        }
    });
});