const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
img.onload = () => ctx.drawImage(img, 0, 0, img.width * scaleFactor, img.height * scaleFactor);
img.src = './media/picture/background/canvas_background.jpg';

let gunshotSound = document.createElement('audio');
let reloadSound = document.createElement('audio');
let broneboyni = document.createElement('audio');
broneboyni.src = './media/soundtracks/broneboyni.mp3';
gunshotSound.src = './media/soundtracks/shot.mp3';
reloadSound.src = './media/soundtracks/reload.mp3';

canvas.width = 300;
canvas.height = 300;

const padding = 5;
const scaleRis = (canvas.width - padding) / 5 / 2.5;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

canvas.addEventListener("click", function (event) {
    if (isValidRGlobal(r_global)) {
        if (!gunshotSound.paused || !reloadSound.paused) {
            launch_toast("ПЕРЕЗАРЯДКА!");
            broneboyni.play();
        } else {
            clearContent();
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left - 13;
            const y = event.clientY - rect.top - 15;

            const x_value = (x - centerX) / scaleRis;
            const y_value = (centerY - y) / scaleRis;

            drawPoint(x_value, [y_value]);

            if (checkPointInArea(x_value, y_value, r_global)) {
                const directory = './media/soundtracks/';
                const fileNameTemplate = 'probitie{x}.mp3';
                let trackNumber = ((Math.floor(Math.random() * (10 - 1 + 1)) + 1) % 2) + 1;
                const filePath = directory + fileNameTemplate.replace('{x}', trackNumber);
                const audio = new Audio(filePath);
                audio.play()

            } else {
                const directory = './media/soundtracks/';
                const fileNameTemplate = 'rikoshet{x}.mp3';
                let trackNumber = ((Math.floor(Math.random() * (10 - 1 + 1)) + 1) % 3) + 1;
                const filePath = directory + fileNameTemplate.replace('{x}', trackNumber);
                const audio = new Audio(filePath);
                audio.play()
            }


            setTimeout(() => {
                sendForm(x_value, y_value);
            }, 4000);
        }
    }
});

function drawAxes(centerX, centerY) {
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width - padding, centerY);

    ctx.moveTo(canvas.width - padding - 10, centerY - 5);
    ctx.lineTo(canvas.width - padding, centerY);
    ctx.lineTo(canvas.width - padding - 10, centerY + 5);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(centerX, canvas.height);
    ctx.lineTo(centerX, padding);

    ctx.moveTo(centerX - 5, padding + 5);
    ctx.lineTo(centerX, padding);
    ctx.lineTo(centerX + 5, padding + 5);
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillStyle = "black"
    ctx.fillText("x", canvas.width - 12, centerY - 7);
    ctx.fillText("y", centerX + 7, 12);

    drawTicks(centerX, centerY);
}

function drawShapes(R) {
    ctx.fillStyle = "rgb(255,117,112,0.3)";

    ctx.beginPath();
    ctx.arc(centerX, centerY, R / 2, Math.PI, Math.PI / 2, true);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(centerX, centerY, R, (R / 2));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - R, centerY);
    ctx.lineTo(centerX, centerY - R);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function clearContent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(centerX, centerY);
    drawShapes(scaleRis * r_global)
}

function drawPoint(x_value, y_values) {
    y_values.forEach((y_value) => {
        document.querySelector('#checkButton').classList.add('charging');
        setTimeout(() => {
            document.querySelector('#checkButton').classList.remove('charging');
        }, 2000);
        console.log(x_value)
        gunshotSound.play()
        console.log(x_value)
        gunshotSound.addEventListener('ended', () => {
            reloadSound.play();
        });
        ctx.beginPath();
        ctx.arc(
            centerX + scaleRis * x_value,
            centerY - scaleRis * y_value,
            3,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "red";
        ctx.closePath();
        ctx.fill();
    });
}

function drawTicks(centerX, centerY) {
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 1;

    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX + i, centerY);
        ctx.lineTo(centerX + i, centerY - 5);
        ctx.stroke();
    }


    ctx.setLineDash([]);
    ctx.strokeStyle = "#ff0202";
    ctx.lineWidth = 1;

    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + i);
        ctx.lineTo(centerX - 5, centerY + i);
        ctx.stroke();
    }
}

function sendForm(x, y) {
    const form = document.getElementById("pointForm");
    const customY = document.getElementById("checkbox-custom-y");
    x = Math.round(x * 10000.0) / 10000.0
    y = Math.round(y * 10000.0) / 10000.0;
    customY.value = y
    customY.disabled = false;
    customY.checked = true;
    form["x"].value = x
    form["y"].value = y
    form["r"].value = r_global;
    form.submit();
}

function isValidRGlobal(value) {
    if ((value == null) || (value === 0.0)) {
        launch_toast("Select R value");
        return false;
    }
    const r = value;
    if (r < 1 || r > 5) {
        launch_toast("R  is out of bounds (allowed range 1 - 5)");
        return false;
    }
    return true;
}

function checkPointInArea(x, y, R) {
    if (x <= 0 && y >= 0 && y <= R + x) {
        return true;
    } else if (x <= 0 && y <= 0 && (x * x + y * y <= (R / 2) * (R / 2))) {
        return true;
    } else if (x >= 0 && y <= 0 && x <= R && y >= -R / 2) {
        return true;
    }
    return false;
}