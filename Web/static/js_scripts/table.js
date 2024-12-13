let currentPage = 1; // Текущая страница таблицы
const maxRowsPerPage = 10; // Максимальное количество строк на одной странице
const tables = []; // Массив для хранения таблиц
let number = 1; // Счетчик для нумерации строк

// Функция для добавления результата в таблицу
function addResultToTable(x, y, r, hit, currentTime, executedTime) {
    const currentTable = getOrCreateCurrentTable(); // Получаем текущую таблицу или создаем новую
    const newRow = document.createElement("tr"); // Создаем новую строку

    // Создаем ячейки для каждого значения
    const numCell = document.createElement("td");
    numCell.textContent = number.toString();
    number += 1;

    const xCell = document.createElement("td");
    xCell.textContent = x;

    const yCell = document.createElement("td");
    yCell.textContent = y;

    const rCell = document.createElement("td");
    rCell.textContent = r;

    const resultCell = document.createElement("td");
    resultCell.textContent = hit ? "Hit" : "Miss";

    const currentTimeCell = document.createElement("td");
    currentTimeCell.textContent = currentTime;

    const executedTimeCell = document.createElement("td");
    executedTimeCell.textContent = executedTime + " ms";

    // Добавляем ячейки в строку
    newRow.appendChild(numCell);
    newRow.appendChild(xCell);
    newRow.appendChild(yCell);
    newRow.appendChild(rCell);
    newRow.appendChild(resultCell);
    newRow.appendChild(currentTimeCell);
    newRow.appendChild(executedTimeCell);

    // Вставляем новую строку в таблицу
    currentTable.insertBefore(newRow, currentTable.rows[1]);
    saveTableData(x, y, r, hit, currentTime, executedTime); // Сохраняем данные в localStorage

    // Если количество строк превышает максимальное, создаем новую страницу
    if (currentTable.rows.length > maxRowsPerPage) {
        currentPage++;
        createNewTablePage();
    }
}

// Функция для получения текущей таблицы или создания новой
function getOrCreateCurrentTable() {
    if (!tables[currentPage]) {
        createNewTablePage();
    }
    return tables[currentPage];
}

// Функция для создания новой страницы таблицы
function createNewTablePage() {
    const contentContainer = document.querySelector(".content-container"); // Получаем контейнер для таблиц

    const newTable = document.createElement("table"); // Создаем новую таблицу
    newTable.setAttribute("id", `result-table-page-${currentPage}`); // Устанавливаем ID таблицы
    newTable.innerHTML = `
        <tr>
            <th>№</th>
            <th>x</th>
            <th>y</th>
            <th>R</th>
            <th>Result</th>
            <th>Executed at</th>
            <th>Execution time</th>
        </tr>
    `; // Добавляем заголовки столбцов

    contentContainer.appendChild(newTable); // Добавляем таблицу в контейнер
    tables[currentPage] = newTable; // Сохраняем таблицу в массив

    updateVisibleTable(); // Обновляем видимость таблиц
}

// Функция для обновления видимости таблиц
function updateVisibleTable() {
    tables.forEach((table, index) => {
        if (index === currentPage) {
            table.style.display = "table"; // Показываем текущую таблицу
        } else {
            table.style.display = "none"; // Скрываем остальные таблицы
        }
    });
}

// Функция для перехода на следующую страницу
function nextPage() {
    if (currentPage < tables.length - 1) {
        currentPage++;
        updateVisibleTable();
    }
}

// Функция для перехода на предыдущую страницу
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateVisibleTable();
    }
}

// Функция для сохранения данных таблицы в localStorage
function saveTableData(x, y, r, shot, currentTime, executedTime) {
    if (typeof localStorage === 'undefined') {
        console.error('localStorage is not supported in this browser.');
        return;
    }

    const storedTableData = JSON.parse(localStorage.getItem('tableData')) || []; // Получаем сохраненные данные или создаем новый массив
    storedTableData.push({x, y, r, shot, currentTime, executedTime}); // Добавляем новые данные
    localStorage.setItem('tableData', JSON.stringify(storedTableData)); // Сохраняем данные в localStorage
}

// Функция для загрузки данных таблицы из localStorage
function loadTableData() {
    if (typeof localStorage === 'undefined') {
        console.error('localStorage is not supported in this browser.');
        return;
    }

    try {
        const storedTableData = JSON.parse(localStorage.getItem('tableData')); // Получаем сохраненные данные
        if (storedTableData) {
            tables.forEach(table => {
                table.innerHTML = `
                    <tr>
                        <th>№</th>
                        <th>x</th>
                        <th>y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Executed at</th>
                        <th>Execution time</th>
                    </tr>
                `; // Очищаем таблицы
            });

            number = 1; // Сбрасываем счетчик

            storedTableData.forEach(result => {
                addResultToTable(result.x, result.y, result.r, result.shot, result.currentTime, result.executedTime); // Добавляем данные в таблицы
            });
        }
    } catch (error) {
        console.error('Error parsing tableData from localStorage:', error);
    }
}

// Функция для очистки данных таблицы и localStorage
function clearTableData() {
    if (typeof localStorage === 'undefined') {
        console.error('localStorage is not supported in this browser.');
        return;
    }

    localStorage.removeItem('tableData'); // Удаляем данные из localStorage

    tables.forEach(table => {
        table.innerHTML = `
            <tr>
                <th>№</th>
                <th>x</th>
                <th>y</th>
                <th>R</th>
                <th>Result</th>
                <th>Executed at</th>
                <th>Execution time</th>
            </tr>
        `; // Очищаем таблицы
    });

    currentPage = 1; // Сбрасываем текущую страницу
    number = 1; // Сбрасываем счетчик

    updateVisibleTable(); // Обновляем видимость таблиц
}