const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskNameInput = document.getElementById('task-name');
const dueDateInput = document.getElementById('due-date');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    if (!taskName) {
        alert('Please enter a task name.');
        return;
    }
    if (!dueDate) {
        alert('Please enter a due date.');
        return;
    }

    const task = {
        name: taskName,
        dueDate: dueDate,
        done: false
    };
    tasks.push(task);
    renderTasks();

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskNameInput.value = '';
    dueDateInput.value = '';
});

function renderTasks() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        // Create list item element
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (task.done) {
            li.classList.add('done');
        }

        // Create task name element
        const taskName = document.createElement('span');
        taskName.textContent = task.name;
        li.appendChild(taskName);

        // Create task due date element
        const dueDate = document.createElement('span');
        dueDate.textContent = task.dueDate;
        dueDate.classList.add('badge', 'badge-secondary');
        li.appendChild(dueDate);

        // Create task actions element
        const actions = document.createElement('div');
        actions.classList.add('actions');

        // Create "Complete" button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="bi bi-check"></i>';
        completeButton.classList.add('btn', 'btn-sm', 'btn-success', 'mr-1');
        completeButton.addEventListener('click', function() {
            task.done = !task.done;
            renderTasks();

            // Save tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        actions.appendChild(completeButton);

        // Create "Delete" button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteButton.addEventListener('click', function() {
            tasks.splice(i, 1);
            renderTasks();

            // Save tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        actions.appendChild(deleteButton);

        li.appendChild(actions);
        taskList.appendChild(li);
    }
}
