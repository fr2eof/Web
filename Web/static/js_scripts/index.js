const PORT = 5656;
const HOST = "localhost";

const form = document.getElementById("pointForm");
const y_value = document.getElementById("y");
let x;
let r_global = 0.0

window.addEventListener('load', () => {
    drawAxes(centerX, centerY);
    createNewTablePage();
    loadTableData();

    let rCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    rCheckboxes.forEach(function (chbox) {
        chbox.addEventListener('change', function () {
            try {
                let rCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

                r_global = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));

                clearContent();
            } catch (error) {
                console.error(error.message);
            }
        });
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

        if (yNumber < -3.0 || yNumber > 5.0) {
            launch_toast("Y is out of bounds (allowed range -3.0 - 5.0)");
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
        let x = parseFloat(document.querySelector('input[type="radio"]:checked').value);
        const y = parseFloat(document.getElementById("y").value);
        const rCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');


        if (!isValidX(x)) {
            clearContent();
            return;
        }
        if (!isValidY(y)) {
            clearContent();
            return;
        }
        if (!isValidR(rCheckboxes)) {
            clearContent();
            return;
        }

        const rValues = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));
        r_global = rValues;
        drawPoint(x, y);
        rValues.forEach(r => {
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

function isValidR(rCheckboxes) {
    const validRValues = [1, 1.5, 2, 2.5, 3];

    if (rCheckboxes.length === 0) {
        launch_toast("Select at least one R value");
        return false;
    }

    const rValues = Array.from(rCheckboxes).map(checkbox => parseFloat(checkbox.value));

    if (!rValues.every(r => validRValues.includes(r))) {
        launch_toast("R value(s) is incorrect.");
        return false;
    }
    return true;
}

function isValidY(value) {
    const y = parseFloat(value);
    if (isNaN(y)) {
        launch_toast("Fill in the field for Y");
    } else if (y < -3.0 || y > 5.0) {
        launch_toast("Y  is out of bounds (allowed range -3.0 - 5.0)");
        return false;
    }
    return true;
}

function isValidX(value) {
    if (value == null) {
        launch_toast("Select X value");
        return false;
    }
    const r = parseInt(value.value);
    if (r < -4 || r > 4) {
        launch_toast("X  is out of bounds (allowed range -4 - 4)");
        return false;
    }
    return true;
}