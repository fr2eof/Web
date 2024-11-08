let currentPage = 1;
const maxRowsPerPage = 10;
const tables = [];
let number = 1;

function addResultToTable(x, y, r, hit, currentTime, executedTime) {
    const currentTable = getOrCreateCurrentTable();
    const newRow = document.createElement("tr");

    const numCell = document.createElement("td")
    numCell.textContent = number.toString();
    number += 1;

    const xCell = document.createElement("td");
    xCell.textContent = x;

    const yCell = document.createElement("td");
    yCell.textContent = y;

    const rCell = document.createElement("td");
    rCell.textContent = r;

    const resultCell = document.createElement("td");
    resultCell.textContent = hit ? "ЕСТЬ ПРОБИТИЕ" : "НЕ ПРОБИЛ";

    const currentTimeCell = document.createElement("td");
    currentTimeCell.textContent = currentTime;

    const executedTimeCell = document.createElement("td");
    executedTimeCell.textContent = executedTime + " ms";

    newRow.appendChild(numCell);
    newRow.appendChild(xCell);
    newRow.appendChild(yCell);
    newRow.appendChild(rCell);
    newRow.appendChild(resultCell);
    newRow.appendChild(currentTimeCell);
    newRow.appendChild(executedTimeCell);

    currentTable.insertBefore(newRow, currentTable.rows[1]);

    if (currentTable.rows.length > maxRowsPerPage) {
        currentPage++;
        createNewTablePage();
    }
}

function getOrCreateCurrentTable() {
    if (!tables[currentPage]) {
        createNewTablePage();
    }
    return tables[currentPage];
}

function createNewTablePage() {
    const contentContainer = document.querySelector(".content-container");

    const newTable = document.createElement("table");
    newTable.setAttribute("id", `result-table-page-${currentPage}`);
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
    `;

    contentContainer.appendChild(newTable);
    tables[currentPage] = newTable;

    updateVisibleTable();
}

function updateVisibleTable() {
    tables.forEach((table, index) => {
        if (index === currentPage) {
            table.style.display = "table";
        } else {
            table.style.display = "none";
        }
    });
}

function nextPage() {
    if (currentPage < tables.length - 1) {
        currentPage++;
        updateVisibleTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateVisibleTable();
    }
}

// function saveTableData(x, y, r, shot, currentTime, executedTime) {
//     if (typeof localStorage === 'undefined') {
//         console.error('localStorage is not supported in this browser.');
//         return;
//     }
//
//     const storedTableData = JSON.parse(localStorage.getItem('tableData')) || [];
//     storedTableData.push({x, y, r, shot, currentTime, executedTime});
//     localStorage.setItem('tableData', JSON.stringify(storedTableData));
// }

// function loadTableData() {
//     if (typeof localStorage === 'undefined') {
//         console.error('localStorage is not supported in this browser.');
//         return;
//     }
//
//     try {
//         const storedTableData = JSON.parse(localStorage.getItem('tableData'));
//         if (storedTableData) {
//             tables.forEach(table => {
//                 table.innerHTML = `
//                     <tr>
//                         <th>№</th>
//                         <th>x</th>
//                         <th>y</th>
//                         <th>R</th>
//                         <th>Result</th>
//                         <th>Executed at</th>
//                         <th>Execution time</th>
//                     </tr>
//                 `;
//             });
//
//             number = 1;
//
//             storedTableData.forEach(result => {
//                 addResultToTable(result.x, result.y, result.r, result.shot, result.currentTime, result.executedTime);
//             });
//         }
//     } catch (error) {
//         console.error('Error parsing tableData from localStorage:', error);
//     }
// }

// function clearTableData() {
//     if (typeof localStorage === 'undefined') {
//         console.error('localStorage is not supported in this browser.');
//         return;
//     }
//
//     localStorage.removeItem('tableData');
//
//     tables.forEach(table => {
//         table.innerHTML = `
//             <tr>
//                 <th>№</th>
//                 <th>x</th>
//                 <th>y</th>
//                 <th>R</th>
//                 <th>Result</th>
//                 <th>Executed at</th>
//                 <th>Execution time</th>
//             </tr>
//         `;
//     });
//
//     currentPage = 1;
//     number = 1;
//
//     updateVisibleTable();
// }
