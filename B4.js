let employees = JSON.parse(localStorage.getItem('employees')) || [];
let currentPage = 1;
const recordsPerPage = 3;

function renderTable() {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';
    
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedEmployees = employees.slice(start, end);

    paginatedEmployees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
        `;
        employeeList.appendChild(row);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(employees.length / recordsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = i === currentPage ? 'active' : '';
        button.onclick = () => {
            currentPage = i;
            renderTable();
        };
        pagination.appendChild(button);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(employees.length / recordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function addEmployee() {
    const name = document.getElementById('name').value.trim();
    const position = document.getElementById('position').value.trim();

    if (!name || !position) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }

    employees.push({ name, position });
    localStorage.setItem('employees', JSON.stringify(employees));

    document.getElementById('name').value = '';
    document.getElementById('position').value = '';

    currentPage = Math.ceil(employees.length / recordsPerPage);
    renderTable();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});
