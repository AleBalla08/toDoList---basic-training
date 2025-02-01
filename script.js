const textBox = document.getElementById('text-input')
const saveBtn = document.getElementById('btn-save')
const taskCont = document.querySelector('.tasks-container')


saveBtn.addEventListener('click', (e) => {
    const value = textBox.value.trim();
    if (value === '') return; // Evita adicionar tarefas vazias

    const task = document.createElement('li');
    task.classList.add('task');
    task.innerHTML = `
        <div>
            <input class='checkbox-task' type="checkbox">
            <p class='task-text-value'>${value}</p>
        </div>
        <i class="fa-regular fa-pen-to-square edit-task"></i>
        <i class='delete-task'>&times;</i>
    `;

    taskCont.appendChild(task);

    textBox.value = '';

    var deleteTask = document.querySelectorAll('.delete-task');
    deleteTask.forEach((element) => {
        element.addEventListener('click', (e) => {
            var e = e.currentTarget;
            var parent = e.parentElement;
            parent.remove();
        });
    });

    const clearFinished = document.querySelector('.clear-checked');
    const checkboxTask = document.querySelectorAll('.checkbox-task');

    clearFinished.addEventListener('click', () => {
        checkboxTask.forEach(checkbox => {
            if (checkbox.checked) {
                console.log('O checkbox está marcado!');
                const task = checkbox.closest('.task'); 
                task.remove(); 
            } else {
                console.log('O checkbox não está marcado!');
            }
        });
    });

    const editTask = document.querySelectorAll('.edit-task');  

    editTask.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.currentTarget.closest('.task'); 

            const taskText = parent.querySelector('p'); 
            const currentText = taskText.innerText; 

            const newText = prompt('Edit your task name', currentText); 

            if (newText !== null && newText.trim() !== '') {
                taskText.innerText = newText.trim();    
            }
        });
    });
});

textBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        saveBtn.click();
    }
});

