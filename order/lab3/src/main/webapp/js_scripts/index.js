const form = document.getElementById("pointForm");
const y_value = document.getElementById("y");
const x_value = document.getElementById("x");
let r_global = 0.0;

// При загрузке страницы выполняются следующие действия:
window.addEventListener('load', () => {
    // Отрисовка осей координат
    drawAxes(centerX, centerY);
    // Создание новой страницы для таблицы
    createNewTablePage();
    // Загрузка данных таблицы
    loadTableData();

    // Получение всех чекбоксов для выбора значения R
    let rRadios = document.querySelectorAll("#r input[type='radio']");

    rRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            try {
                r_global = parseInt(radio.value);
                clearContent();
            } catch (error) {
                console.error(error.message);
            }
        });
    });

    x_value.addEventListener("change", () => {
        const x = x_value.value.trim();

        if (!x) {
            alert("Fill in the field for X");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (isNaN(x)) {
            alert("The input does not match the format. Please enter a valid number.");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        const xNumber = parseFloat(x);

        if (x.includes(".") && x.split(".")[1].length > 4) {
            alert("X value can have at most 4 decimal places.");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (xNumber < -3.0 || xNumber > 5.0) {
            alert("X is out of bounds (allowed range -3.0 - 5.0)");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        x_value.classList.add("valid-input");
        x_value.classList.remove("invalid-input");
        clearContent();

    });

    // Добавление обработчика события при изменении значения Y
    y_value.addEventListener("change", () => {
        const y = y_value.value.trim();

        // Проверка, что поле Y не пустое
        if (!y) {
            alert("Fill in the field for Y");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        // Проверка, что введенное значение является числом
        if (isNaN(y)) {
            alert("The input does not match the format. Please enter a valid number.");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        const yNumber = parseFloat(y);

        // Проверка, что количество знаков после запятой не превышает 4
        if (y.includes(".") && y.split(".")[1].length > 4) {
            alert("Y value can have at most 4 decimal places.");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        // Проверка, что значение Y находится в допустимом диапазоне
        if (yNumber < -5.0 || yNumber > 5.0) {
            alert("Y is out of bounds (allowed range -5.0 - 5.0)");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        // Установка классов для валидного ввода
        y_value.classList.add("valid-input");
        y_value.classList.remove("invalid-input");
        clearContent();
    });

    // Добавление обработчика события при отправке формы
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let x = parseFloat(document.getElementById("x").value);
        let y = parseFloat(document.getElementById("y").value);
        let r = document.querySelector('input[type="radio"]:checked');

        if (!isValidX(x)) {
            clearContent();
            return;
        }
        if (!isValidY(y)) {
            clearContent();
            return;
        }
        if (!isValidR(r)) {
            clearContent();
            return;
        }

        drawPoint(x, y);

        setTimeout(() => {
            event.target.submit();
        }, 1000);
    });

    console.log("The page is fully loaded");
});

// Функция для проверки валидности значения R
function isValidR(value) {
    if (value == null) {
        alert("Select R value");
        return false;
    }
    const r = parseInt(value.value);
    if (r < 1 || r > 5) {
        alert("R is out of bounds (allowed range 1 - 5)");
        return false;
    }
    return true;
}

// Функция для проверки валидности значения Y
function isValidY(value) {
    const y = parseFloat(value);
    if (isNaN(y)) {
        alert("Fill in the field for Y");
    } else if (y < -5.0 || y > 5.0) {
        alert("Y is out of bounds (allowed range -5.0 - 5.0)");
        return false;
    }
    return true;
}

// Функция для проверки валидности значения X
function isValidX(value) {
    if (value === null) {
        alert("Fill in the field for X");
        return false;
    }
    const x = parseInt(value.value);
    if (x < -3.0 || x > 5.0) {
        alert("X is out of bounds (allowed range -3 - 5)");
        return false;
    }
    return true;
}