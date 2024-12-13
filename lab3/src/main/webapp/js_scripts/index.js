const interval = 9000;
document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateClock, interval);
    updateClock();
});

function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = `${date} ${time}`;
}