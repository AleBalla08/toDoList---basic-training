const textBox = document.getElementById('text-input');
const saveBtn = document.getElementById('btn-save');
const taskCont = document.querySelector('.tasks-container');
const clearFinished = document.querySelector('.clear-checked');

document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCont.innerHTML = ''; 
    tasks.forEach(addToDom);
}

function saveTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const newTask = {
        id: Date.now(),
        text,
        finished: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addToDom(newTask);
}

function addToDom(taskData) {
    const task = document.createElement('li');
    task.classList.add('task');
    task.dataset.id = taskData.id;

    task.innerHTML = `
        <div>
            <input class='checkbox-task' type="checkbox" ${taskData.finished ? 'checked' : ''}>
            <p class='task-text-value'>${taskData.text}</p>
        </div>
        <i class="fa-regular fa-pen-to-square edit-task"></i>
        <i class='delete-task'>&times;</i>
    `;

    taskCont.appendChild(task);
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(id, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => (task.id === id ? { ...task, text: newText } : task));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function finishTask(id, finished) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => (task.id === id ? { ...task, finished } : task));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

saveBtn.addEventListener('click', () => {
    const value = textBox.value.trim();
    if (value === '') return;

    saveTask(value);
    textBox.value = '';
});

taskCont.addEventListener('click', (e) => {
    const taskElement = e.target.closest('.task');
    if (!taskElement) return; 

    const id = Number(taskElement.dataset.id);

    if (e.target.classList.contains('delete-task')) {
        removeTask(id);
        taskElement.remove();
    }

    if (e.target.classList.contains('edit-task')) {
        const taskText = taskElement.querySelector('.task-text-value');
        const newText = prompt('Edit your task name', taskText.innerText);

        if (newText !== null && newText.trim() !== '') {
            taskText.innerText = newText.trim();
            editTask(id, newText.trim());
        }
    }

    if (e.target.classList.contains('checkbox-task')) {
        finishTask(id, e.target.checked);
    }
});


clearFinished.addEventListener('click', () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !task.finished);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.querySelectorAll('.checkbox-task:checked').forEach(task => task.closest('.task').remove());
});


