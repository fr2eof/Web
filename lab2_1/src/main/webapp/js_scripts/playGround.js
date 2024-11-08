const form = document.getElementById("pointForm");
const x_value = document.getElementById("x");
let backgroundMusic = document.createElement('audio');

let r_global = 0

window.addEventListener('load', () => {

    backgroundMusic.src = './media/soundtracks/battle.mp3';
    backgroundMusic.loop = true;
    document.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch((error) => {
                console.log('Ошибка при воспроизведении музыки:', error);
            });
        }
    }, {once: true});

    drawAxes(centerX, centerY);

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
            launch_toast("Fill in the field for X");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (isNaN(x)) {
            launch_toast("The input does not match the format. Please enter a valid number.");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        const xNumber = parseFloat(x);

        if (x.includes(".") && x.split(".")[1].length > 4) {
            launch_toast("X value can have at most 4 decimal places.");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        if (xNumber < -5.0 || xNumber > 5.0) {
            launch_toast("X is out of bounds (allowed range -5.0 - 5.0)");
            x_value.classList.add("invalid-input");
            x_value.classList.remove("valid-input");
            clearContent();
            return;
        }

        x_value.classList.add("valid-input");
        x_value.classList.remove("invalid-input");
        clearContent();

    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let x = parseFloat(document.getElementById("x").value);
        let yValues = Array.from(document.querySelectorAll('input[name="y"]:checked')).map(checkbox => parseInt(checkbox.value));
        let r = document.querySelector('input[type="radio"]:checked');

        if (!isValidX(x)) {
            clearContent();
            return;
        }
        if (!isValidY(yValues)) {
            clearContent();
            return;
        }
        if (!isValidR(r)) {
            clearContent();
            return;
        }

        drawPoint(x, yValues);
        let currentTime = new Date().toLocaleTimeString('ru-RU', {hour12: false});//todo rotate somewhere

        setTimeout(() => {
            event.target.submit();
        }, 3500);
    });
});

function isValidX(value) {
    const x = parseFloat(value);
    if (isNaN(x)) {
        launch_toast("Fill in the field for X");
    } else if (x < -5.0 || x > 5.0) {
        launch_toast("X  is out of bounds (allowed range -5.0 - 5.0)");
        return false;
    }
    return true;
}

function isValidY(yValues) {
    const validYValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

    if (yValues.length === 0) {
        launch_toast("Select at least one Y value");
        return false;
    }

    if (!yValues.every(y => validYValues.includes(y))) {
        launch_toast("Y value(s) is incorrect.");
        return false;
    }
    return true;
}

function isValidR(value) {
    if (value == null) {
        launch_toast("Select R value");
        return false;
    }
    const r = parseInt(value.value);
    if (r < 1 || r > 5) {
        launch_toast("R  is out of bounds (allowed range 1 - 5)");
        return false;
    }
    return true;
}