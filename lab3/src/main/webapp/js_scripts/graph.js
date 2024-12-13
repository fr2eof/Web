let ctx;
let scaleRis;
let centerX;
let centerY;
let canvas
const padding = 5;

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.className = "horizontal";
    document.querySelector(".canvas-container").appendChild(canvas);
    ctx = canvas.getContext("2d");


    canvas.width = 300;
    canvas.height = 300;

    scaleRis = (canvas.width - padding) / 5 / 2.5;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});

function drawAxes(centerX, centerY) {
    ctx.strokeStyle = "#000000";
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
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";

    ctx.beginPath();
    ctx.arc(centerX, centerY, R / 2, 0, Math.PI / 2, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(centerX, centerY, R / 2, -R);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - R / 2, centerY);
    ctx.lineTo(centerX, centerY - R);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function clearContent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(centerX, centerY);
    if (r_global.length!==0) {
        r_global.forEach(r => {
            drawShapes(scaleRis * r);
        });
    }
}

function drawPoint(x_value, y_value,r) {
    ctx.beginPath();
    ctx.arc(
        centerX + scaleRis * x_value,
        centerY - scaleRis * y_value,
        3,
        0,
        2 * Math.PI
    );
    if (checkPointInArea(x_value, y_value, r)) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.closePath();
    ctx.fill();
}

function drawTicks(centerX, centerY) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX + i, centerY);
        ctx.lineTo(centerX + i, centerY - 5);
        ctx.stroke();
    }


    ctx.setLineDash([]);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + i);
        ctx.lineTo(centerX - 5, centerY + i);
        ctx.stroke();
    }
}