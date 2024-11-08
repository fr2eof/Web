document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;

    // Случайный поворот, чтобы следы выглядели более естественно
    const randomRotation = Math.random() * 60 - 0; // Значение от -30 до 30 градусов
    trail.style.transform += ` rotate(${randomRotation}deg)`;

    // Удаляем элемент после завершения анимации
    trail.addEventListener('animationend', () => {
        trail.remove();
    });
});