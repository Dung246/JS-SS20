document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task}</span>
            <button class="edit-btn" onclick="editTask(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteTask(this)">Xoá</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function saveTasks() {
    const taskList = document.querySelectorAll('.task-item span');
    const tasks = Array.from(taskList).map(task => task.innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Vui lòng nhập nhiệm vụ!");
        return;
    }
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${task}</span>
        <button class="edit-btn" onclick="editTask(this)">Sửa</button>
        <button class="delete-btn" onclick="deleteTask(this)">Xoá</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    saveTasks();
}

function deleteTask(button) {
    if (confirm("Bạn có chắc muốn xóa nhiệm vụ này không?")) {
        const taskItem = button.parentElement;
        taskItem.remove();
        saveTasks();
    }
}

function editTask(button) {
    const taskItem = button.parentElement;
    const task = taskItem.querySelector('span');
    const newTask = prompt("Chỉnh sửa công việc", task.innerText);
    if (newTask) {
        task.innerText = newTask;
        saveTasks();
    }
}
