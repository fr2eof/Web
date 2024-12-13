const canvas = document.getElementById("canvas"); // Получаем элемент canvas по его ID
const ctx = canvas.getContext("2d"); // Получаем контекст рисования 2D

canvas.width = 300; // Устанавливаем ширину canvas
canvas.height = 300; // Устанавливаем высоту canvas

const padding = 5; // Задаем отступ от краев canvas
const scaleRis = (canvas.width - padding) / 5 / 2.5; // Вычисляем масштаб для рисования фигур

const centerX = canvas.width / 2; // Определяем центр canvas по оси X
const centerY = canvas.height / 2; // Определяем центр canvas по оси Y

// Добавляем обработчик события клика на canvas
canvas.addEventListener("click", function (event) {
    if (isValidRGlobal(r_global)) {
        clearContent(); // Очищаем содержимое canvas
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - 13;
        const y = event.clientY - rect.top - 15;

        const x_value = (x - centerX) / scaleRis;
        const y_value = (centerY - y) / scaleRis;

        drawPoint(x_value, y_value); // Рисуем точку на canvas

        setTimeout(() => {
            sendForm(x_value, y_value); // Отправляем форму с координатами точки
        }, 1000);
    }
});

// Функция для отправки формы с координатами точки
function sendForm(x, y) {
    const form = document.getElementById("pointForm");
    x = Math.round(x * 10000.0) / 10000.0;
    y = Math.round(y * 10000.0) / 10000.0;
    form["x"].value = x;
    form["y"].value = y;
    form["r"].value = r_global;
    form.submit();
}

// Функция для проверки валидности глобального значения R
function isValidRGlobal(value) {
    if ((value == null) || (value === 0.0)) {
        alert("Select R value");
        return false;
    }
    const r = value;
    if (r < 1 || r > 5) {
        alert("R is out of bounds (allowed range 1 - 5)");
        return false;
    }
    return true;
}

// Функция для рисования осей координат
function drawAxes(centerX, centerY) {
    ctx.strokeStyle = "#000000"; // Устанавливаем цвет линий
    ctx.lineWidth = 2; // Устанавливаем толщину линий

    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(0, centerY); // Перемещаем перо в начало оси X
    ctx.lineTo(canvas.width - padding, centerY); // Рисуем линию оси X

    // Рисуем стрелку на конце оси X
    ctx.moveTo(canvas.width - padding - 10, centerY - 5);
    ctx.lineTo(canvas.width - padding, centerY);
    ctx.lineTo(canvas.width - padding - 10, centerY + 5);
    ctx.stroke(); // Завершаем рисование

    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(centerX, canvas.height); // Перемещаем перо в начало оси Y
    ctx.lineTo(centerX, padding); // Рисуем линию оси Y

    // Рисуем стрелку на конце оси Y
    ctx.moveTo(centerX - 5, padding + 5);
    ctx.lineTo(centerX, padding);
    ctx.lineTo(centerX + 5, padding + 5);
    ctx.stroke(); // Завершаем рисование

    ctx.font = "16px Arial"; // Устанавливаем шрифт для текста
    ctx.fillStyle = "black"; // Устанавливаем цвет текста
    ctx.fillText("x", canvas.width - 12, centerY - 7); // Пишем "x" рядом с осью X
    ctx.fillText("y", centerX + 7, 12); // Пишем "y" рядом с осью Y

    drawTicks(centerX, centerY); // Рисуем деления на осях
}

// Функция для рисования фигур
function drawShapes(R) {
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // Устанавливаем цвет заливки

    // Рисуем прямоугольник в третьей координатной четверти
    ctx.beginPath();
    ctx.rect(centerX - R, centerY, R, R / 2);
    ctx.closePath();
    ctx.fill(); // Заливаем фигуру
    ctx.stroke(); // Рисуем контур

    // Рисуем четверть круга в первой координатной четверти
    ctx.beginPath();
    ctx.arc(centerX, centerY, R / 2, 0, -Math.PI / 2, true);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill(); // Заливаем фигуру
    ctx.stroke(); // Рисуем контур

    // Рисуем треугольник в четвертой координатной четверти
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY + R);
    ctx.closePath();
    ctx.fill(); // Заливаем фигуру
    ctx.stroke(); // Рисуем контур
}

// Функция для очистки содержимого canvas и перерисовки осей и фигур
function clearContent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
    drawAxes(centerX, centerY); // Перерисовываем оси координат
    drawShapes(scaleRis * r_global); // Перерисовываем фигуры для каждого значения R
}

// Функция для рисования точки на canvas
function drawPoint(x_value, y_value) {
    ctx.beginPath();
    ctx.arc(
        centerX + scaleRis * x_value, // Вычисляем координату X точки
        centerY - scaleRis * y_value, // Вычисляем координату Y точки
        3, // Радиус точки
        0, // Начальный угол
        2 * Math.PI // Конечный угол
    );
    ctx.fillStyle = "red"; // Устанавливаем цвет точки
    ctx.closePath();
    ctx.fill(); // Заливаем точку
}

// Функция для рисования делений на осях координат
function drawTicks(centerX, centerY) {
    ctx.strokeStyle = "#000000"; // Устанавливаем цвет линий
    ctx.lineWidth = 1; // Устанавливаем толщину линий

    // Рисуем деления на оси X
    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX + i, centerY);
        ctx.lineTo(centerX + i, centerY - 5);
        ctx.stroke();
    }

    ctx.setLineDash([]); // Сбрасываем пунктирные линии
    ctx.strokeStyle = "#000000"; // Устанавливаем цвет линий
    ctx.lineWidth = 1; // Устанавливаем толщину линий

    // Рисуем деления на оси Y
    for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + i);
        ctx.lineTo(centerX - 5, centerY + i);
        ctx.stroke();
    }
}