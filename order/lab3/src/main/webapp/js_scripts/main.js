let r_global = [];

document.addEventListener("DOMContentLoaded", () => {
    drawAxes(centerX, centerY);
    handleRChange();
    let x_value;
    let y_value;
    if (document.getElementById("pointForm:wasClick").value === "true") {
        x_value = document.getElementById("pointForm:clickX").value;
        y_value = document.getElementById("pointForm:clickY").value;
        document.getElementById("pointForm:wasClick").value = false;

    } else {
        x_value = document.querySelector(`input[name="pointForm:x"]:checked`).value;
        y_value = document.getElementById("pointForm:y").value;
    }
    r_global.forEach(r => {
        drawPoint(x_value, y_value, r);
    });
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

function isValidX(value) {
    if (value === null) {
        launch_toast("Select X value");
        return false;
    }
    let radio = document.querySelector(`input[name="pointForm:x"]:checked`);

    const x = parseInt(radio.value);
    if (x < -4 || x > 4) {
        launch_toast("X  is out of bounds (allowed range -4 - 4)");
        return false;
    }
    return true;
}

function isValidY(value) {
    const y = parseFloat(value);
    if (isNaN(y)) {
        launch_toast("Fill in the field for Y");
    } else if (y < -5.0 || y > 5.0) {
        launch_toast("Y  is out of bounds (allowed range -5.0 - 5.0)");
        return false;
    }
    return true;
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

function checkPointInArea(x, y, R) {
    if ((y <= (2 * x + R)) && x <= 0 && y >= 0) {
        return true;
    } else if (x >= 0 && y <= 0 && (x * x + y * y <= (R / 2) * (R / 2))) {
        return true;
    } else if (x >= 0 && y >= 0 && x <= R / 2 && y <= R) {
        return true;
    }
    return false;
}

function validateAndSubmitForm() {
    let x = document.getElementById("pointForm:x").value;
    let y = document.getElementById("pointForm:y").value;
    let r = document.getElementById("pointForm:r").value;
    if (isValidX(x) && isValidY(y) && isValidR(r)) {
        drawPoint(x, y, r);
    }
    return isValidX(x) && isValidY(y) && isValidR(r)
}

//todo idk how to use it
//so it doesnt evan work :)
function handleResponse(xhr, status, args) {
    if (status === 'success') {
        // Обработка успешного ответа
        if (args && args.successMessage) {
            alert(args.successMessage);
        } else {
            alert('Операция выполнена успешно.');
        }
    } else if (status === 'error') {
        // Обработка ошибочного ответа
        if (args && args.error) {
            alert('Ошибка: ' + args.error);
        } else {
            alert('Произошла ошибка.');
        }
    } else {
        // Обработка других статусов, если необходимо
        alert('Неизвестный статус: ' + status);
    }
}

function handleYChange(y_value) {
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

    if (yNumber < -5.0 || yNumber > 5.0) {
        launch_toast("Y is out of bounds (allowed range -5.0 - 5.0)");
        y_value.classList.add("invalid-input");
        y_value.classList.remove("valid-input");
        clearContent();
        return;
    }

    y_value.classList.add("valid-input");
    y_value.classList.remove("invalid-input");
    clearContent();
}

function handleXChange(x_value) {
    let radio = document.querySelector(`input[name="pointForm:x"]:checked`);
    let x = radio.value;
    x = parseFloat(x);
    if (x < -4 || x > 4) {
        launch_toast("X  is out of bounds (allowed range -4 - 4)");
    }
}

function handleRChange(r_value) {
    let checkboxes = document.querySelectorAll(`input[name="pointForm:r"]:checked`);
    let selectedValues = [];

    checkboxes.forEach(function (checkbox) {
        selectedValues.push(checkbox.value);
    });
    if (selectedValues.length === 0) {
        launch_toast("Select R value");
        clearContent();
    } else {
        r_global = selectedValues;
        clearContent();
    }
}

function canvasClick() {
    handleRChange();
    if (r_global !== undefined) {
        clearContent();
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - 13;
        const y = event.clientY - rect.top - 15;

        const x_value = (x - centerX) / scaleRis;
        const y_value = (centerY - y) / scaleRis;
        r_global.forEach(r => {
            drawPoint(x_value, y_value, r);
        });
        document.getElementById("pointForm:clickX").value = x_value;
        document.getElementById("pointForm:clickY").value = y_value;
        document.getElementById("pointForm:wasClick").value = true;
        setTimeout(() => {
            document.getElementById("pointForm:submitButton").click();
        }, 1000);
    }

}