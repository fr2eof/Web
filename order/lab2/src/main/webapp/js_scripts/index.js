const PORT = 5657;
const HOST = "localhost";

const form = document.getElementById("pointForm");
const y_value = document.getElementById("y");
let x;
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
    let rCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    rCheckboxes.forEach(function (chbox) {
        // Добавление обработчика события при изменении состояния чекбокса
        chbox.addEventListener('change', function () {
            try {
                // Получение всех выбранных чекбоксов
                let rCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

                // Преобразование выбранных значений R в массив чисел
                r_global = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));

                // Очистка содержимого (например, графика)
                clearContent();
            } catch (error) {
                // Вывод ошибки в консоль
                console.error(error.message);
            }
        });
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
        if (yNumber < -3.0 || yNumber > 5.0) {
            alert("Y is out of bounds (allowed range -3.0 - 5.0)");
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
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        // Получение выбранного значения X
        let x = document.querySelector('input[type="radio"]:checked');
        // Получение значения Y
        const y = parseFloat(document.getElementById("y").value);
        // Получение всех выбранных значений R
        const rCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        // Проверка валидности значения X
        if (!isValidX(x)) {
            clearContent();
            return;
        }
        x = x.value;

        // Проверка валидности значения Y
        if (!isValidY(y)) {
            clearContent();
            return;
        }

        // Проверка валидности значений R
        if (!isValidR(rCheckboxes)) {
            clearContent();
            return;
        }

        // Преобразование выбранных значений R в массив чисел
        const rValues = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));
        r_global = rValues;

        // Отрисовка точки на графике
        drawPoint(x, y);

        // Обработка каждого значения R
        rValues.forEach(r => {
            const currentTime = new Date().toLocaleTimeString('ru-RU', {hour12: false});
            const data = {x: x, y: y, r: r};

            // Отправка данных на сервер
            fetch(`http://${HOST}:${PORT}/fcgi-bin/Web.jar`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                // Обработка различных статусов ответа сервера
                if (response.status === 400) {
                    response.text().then(() => {
                        alert("Error 400: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (response.status === 404) {
                    response.text().then(() => {
                        alert("Error 404: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (response.status === 500) {
                    response.text().then(() => {
                        alert("Error 500: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (!response.ok) {
                    alert("Something else went wrong. The page will reload automatically in 5 sec.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
                return response.json();
            })
                .then(response => {
                    try {
                        // Извлечение данных из ответа сервера
                        const shot = response.shot;
                        const executionTime = response.executionTime;

                        // Добавление результата в таблицу
                        addResultToTable(x, y, r, shot, currentTime, executionTime);
                        saveTableData(x, y, r, shot, currentTime, executionTime); // Сохраняем данные в localStorage
                        // Очистка формы после успешной отправки
                        form.reset();
                    } catch (error) {
                        alert("JSON parsing error. The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                        console.error("JSON parsing error:", error);
                    }
                })
                .catch(error => {
                    alert("Processing data error. The page will reload automatically in 5 sec.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                    console.error("Processing data error:", error);
                });
        });
    });

    console.log("The page is fully loaded");
});

// Функция для проверки валидности значения R
function isValidR(rCheckboxes) {
    const validRValues = [1, 1.5, 2, 2.5, 3];

    // Проверка, что выбрано хотя бы одно значение R
    if (rCheckboxes.length === 0) {
        alert("Select at least one R value");
        return false;
    }

    // Преобразование выбранных значений R в массив чисел
    const rValues = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));

    // Проверка, что все выбранные значения R валидны
    if (!rValues.every(r => validRValues.includes(r))) {
        alert("R value(s) is incorrect.");
        return false;
    }
    return true;
}

// Функция для проверки валидности значения Y
function isValidY(value) {
    const y = parseFloat(value);
    if (isNaN(y)) {
        alert("Fill in the field for Y");
    } else if (y < -3.0 || y > 5.0) {
        alert("Y  is out of bounds (allowed range -3.0 - 5.0)");
        return false;
    }
    return true;
}

// Функция для проверки валидности значения X
function isValidX(value) {
    if (value === null) {
        alert("Select X value");
        return false;
    }
    const x = parseInt(value.value);
    if (x < -4 || x > 4) {
        alert("X  is out of bounds (allowed range -4 - 4)");
        return false;
    }
    return true;
}