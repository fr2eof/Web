const PORT = 5656;
const HOST = "localhost";

let r_global = 0.0

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pointForm");
    const y_value = document.getElementById("y");
    const r_value = document.getElementById("r");

    drawAxes(centerX, centerY);
    createNewTablePage();
    loadTableData();

    r_value.addEventListener("change", () => {
        const r = r_value.value.trim();

        if (!r) {
            launch_toast("Fill in the field for R");
            r_value.classList.add("invalid-input");
            r_value.classList.remove("valid-input");
            r_global = 0.0
            clearContent();
            return;
        }

        if (isNaN(r)) {
            launch_toast("The input does not match the format. Please enter a valid number.");
            r_value.classList.add("invalid-input");
            r_value.classList.remove("valid-input");
            r_global = 0.0
            clearContent();
            return;
        }

        const rNumber = parseFloat(r);

        // Проверка на количество знаков после запятой (больше 4)
        if (r.includes(".") && r.split(".")[1].length > 4) {
            launch_toast("R value can have at most 4 decimal places.");
            r_value.classList.add("invalid-input");
            r_value.classList.remove("valid-input");
            r_global = 0.0
            clearContent();
            return;
        }

        if (rNumber < 1.0 || rNumber > 4.0) {
            launch_toast("R is out of bounds (allowed range 1.0 - 4.0)");
            r_value.classList.add("invalid-input");
            r_value.classList.remove("valid-input");
            r_global = 0.0
            clearContent();
            return;
        }

        r_value.classList.add("valid-input");
        r_value.classList.remove("invalid-input");

        try {
            r_global = rNumber;
            clearContent();
        } catch (error) {
            console.error(error.message);
        }
    });

    y_value.addEventListener("change", () => {
        const y = y_value.value.trim();

        if (!y) {
            launch_toast("Fill in the field for Y");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (isNaN(y)) {
            launch_toast("The input does not match the format. Please enter a valid number.");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        const yNumber = parseFloat(y);

        if (y.includes(".") && y.split(".")[1].length > 4) {
            launch_toast("Y value can have at most 4 decimal places.");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (yNumber < -5.0 || yNumber > 3.0) {
            launch_toast("Y is out of bounds (allowed range -5.0 - 3.0)");
            y_value.classList.add("invalid-input");
            y_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        y_value.classList.add("valid-input");
        y_value.classList.remove("invalid-input");
        clearContent();

    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const xCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const y = parseFloat(document.getElementById("y").value);
        const r = parseFloat(document.getElementById("r").value);


        if (!isValidX(xCheckboxes)) {
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

        const xValues = Array.from(xCheckboxes).map(checkbox => parseFloat(checkbox.value));
        drawPoint(xValues, y, r);

        xValues.forEach(x => {
            const currentTime = new Date().toLocaleTimeString('ru-RU', {hour12: false});
            const data = {x: x, y: y, r: r};

            fetch(`http://${HOST}:${PORT}/fcgi-bin/Web.jar`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 400) {
                    response.text().then(() => {
                        launch_toast("Error 400: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (response.status === 404) {
                    response.text().then(() => {
                        launch_toast("Error 404: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (response.status === 500) {
                    response.text().then(() => {
                        launch_toast("Error 500: The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    });
                    return;
                } else if (!response.ok) {
                    launch_toast("Something else went wrong. The page will reload automatically in 5 sec.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
                return response.json();
            })
                .then(response => {
                    //console.log("Ответ сервера:", response);
                    try {
                        const shot = response.shot;
                        const executionTime = response.executionTime;

                        addResultToTable(x, y, r, shot, currentTime, executionTime);
                    } catch (error) {
                        launch_toast("JSON parsing error. The page will reload automatically in 5 sec.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                        console.error("JSON parsing error:", error);
                    }
                })
                .catch(error => {
                    launch_toast("Processing data error. The page will reload automatically in 5 sec.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                    console.error("Processing data error:", error);
                });
        });
    });

    canvas.addEventListener("click", function (event) {
        if (isValidRGlobal(r_global)) {
            clearContent();
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left - 13;
            const y = event.clientY - rect.top - 15;

            const x_value = (x - centerX) / scaleRis;
            const y_value = (centerY - y) / scaleRis;

            drawPoint(x_value, [y_value]);

            if (checkPointInArea(x_value, y_value, r_global)) {
                //todo finish point color
            } else {
                //todo finish point color
            }


            setTimeout(() => {
                sendForm(x_value, y_value);
            }, 1000);
        }
    });

    console.log("The page is fully loaded");
});

function launch_toast(message) {
    const toast = document.getElementById("toast");
    const descElement = document.getElementById('desc');

    descElement.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.textContent = message;

    descElement.appendChild(paragraph);
    toast.className = "show";
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}

function isValidX(xCheckboxes) {
    const validXValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

    if (xCheckboxes.length === 0) {
        launch_toast("Select at least one X value");
        return false;
    }

    const xValues = Array.from(xCheckboxes).map(checkbox => parseFloat(checkbox.value));

    if (!xValues.every(x => validXValues.includes(x))) {
        launch_toast("X value(s) is incorrect.");
        return false;
    }
    return true;
}

function isValidY(value) {
    const y = parseFloat(value);
    if (isNaN(y)) {
        launch_toast("Fill in the field for Y");
    } else if (y < -5.0 || y > 3.0) {
        launch_toast("Y  is out of bounds (allowed range -5.0 - 3.0)");
        return false;
    }
    return true;
}

function isValidR(value) {
    const r = parseFloat(value);
    if (isNaN(r)) {
        launch_toast("Fill in the field for R");
        return false;
    } else if (r < 1.0 || r > 4.0) {
        launch_toast("R  is out of bounds (allowed range 1.0 - 4.0)");
        return false;
    }
    return true;
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
