



document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('reset-btn').addEventListener('click', resetList);
document.getElementById('search-input').addEventListener('input', searchTasks);
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

let isDarkMode = false;

function addTask() {
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    const noteInput = document.getElementById('note-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value === '' || dateInput.value === '' || timeInput.value === '') {
        alert('Please enter all task details');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskDetails.innerHTML = `<strong>Task:</strong> <span class="task-text">${taskInput.value}</span><br>
                             <strong>Date:</strong> ${dateInput.value}<br>
                             <strong>Time:</strong> ${timeInput.value}<br>
                             <strong>Notes:</strong> ${noteInput.value}`;

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', () => {
        if (completeCheckbox.checked) {
            taskDetails.classList.add('complete-task');
        } else {
            taskDetails.classList.remove('complete-task');
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Archive';
    deleteBtn.addEventListener('click', () => {
        archiveTask(taskItem);
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const taskText = taskDetails.querySelector('.task-text');
        taskInput.value = taskText.innerText;
        dateInput.value = dateInput.defaultValue;
        timeInput.value = timeInput.defaultValue;
        noteInput.value = noteInput.defaultValue;
        taskList.removeChild(taskItem);
    });

    const bgColorPicker = document.createElement('input');
    bgColorPicker.type = 'color';
    bgColorPicker.classList.add('color-picker');
    bgColorPicker.addEventListener('input', (e) => {
        taskItem.style.backgroundColor = e.target.value;
    });

    const textColorPicker = document.createElement('input');
    textColorPicker.type = 'color';
    textColorPicker.classList.add('color-picker');
    textColorPicker.addEventListener('input', (e) => {
        taskDetails.querySelector('.task-text').style.color = e.target.value;
    });

    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(bgColorPicker);
    taskItem.appendChild(textColorPicker);
    taskList.appendChild(taskItem);

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    noteInput.value = '';
}

function archiveTask(taskItem) {
    const archiveList = document.getElementById('archive-list');
    taskItem.classList.remove('task-item');
    taskItem.classList.add('archive-item');
    archiveList.appendChild(taskItem);
}

function resetList() {
    const taskList = document.getElementById('task-list');
    const archiveList = document.getElementById('archive-list');
    taskList.innerHTML = '';
    archiveList.innerHTML = '';
}

function searchTasks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const tasks = document.querySelectorAll('.task-item, .archive-item');

    tasks.forEach(task => {
        const taskText = task.querySelector('.task-details').innerText.toLowerCase();
        if (taskText.includes(searchInput)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
}


document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    const noteInput = document.getElementById('note-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const archiveList = document.getElementById('archive-list');
    const resetButton = document.getElementById('reset-btn');
    const searchInput = document.getElementById('search-input');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

    let isDarkMode = false;

    function addTask() {
        if (taskInput.value === '' || dateInput.value === '' || timeInput.value === '') {
            alert('Please enter all task details');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.innerHTML = `<strong>Task:</strong> <span class="task-text">${taskInput.value}</span><br>
                                 <strong>Date:</strong> ${dateInput.value}<br>
                                 <strong>Time:</strong> ${timeInput.value}<br>
                                 <strong>Notes:</strong> ${noteInput.value}`;

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.addEventListener('change', () => {
            if (completeCheckbox.checked) {
                taskDetails.classList.add('complete-task');
            } else {
                taskDetails.classList.remove('complete-task');
            }
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                archiveTask(taskItem);
            }
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            taskInput.value = taskDetails.querySelector('.task-text').innerText;
            dateInput.value = dateInput.defaultValue;
            timeInput.value = timeInput.defaultValue;
            noteInput.value = noteInput.defaultValue;
            taskList.removeChild(taskItem);
            saveTasks();
        });

        const bgColorPicker = document.createElement('input');
        bgColorPicker.type = 'color';
        bgColorPicker.classList.add('color-picker');
        bgColorPicker.addEventListener('input', (e) => {
            taskItem.style.backgroundColor = e.target.value;
        });

        const textColorPicker = document.createElement('input');
        textColorPicker.type = 'color';
        textColorPicker.classList.add('color-picker');
        textColorPicker.addEventListener('input', (e) => {
            taskDetails.querySelector('.task-text').style.color = e.target.value;
        });

        taskItem.appendChild(completeCheckbox);
        taskItem.appendChild(taskDetails);
        taskItem.appendChild(deleteBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(bgColorPicker);
        taskItem.appendChild(textColorPicker);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        noteInput.value = '';
        saveTasks();
    }

    function archiveTask(taskItem) {
        const archiveItem = taskItem.cloneNode(true);
        archiveItem.classList.remove('task-item');
        archiveItem.classList.add('archive-item');
        archiveItem.querySelector('.delete-btn').remove(); // Remove delete button from archived item
        archiveList.appendChild(archiveItem);
        taskItem.remove();
        saveTasks();
    }

    function resetList() {
        taskList.innerHTML = '';
        archiveList.innerHTML = '';
        saveTasks();
    }

    function searchTasks() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const tasks = document.querySelectorAll('.task-item, .archive-item');

        tasks.forEach(task => {
            const taskText = task.querySelector('.task-details').innerText.toLowerCase();
            if (taskText.includes(searchInput)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').innerText,
                completed: taskItem.querySelector('input[type="checkbox"]').checked,
                color: window.getComputedStyle(taskItem).backgroundColor,
                textColor: window.getComputedStyle(taskItem.querySelector('.task-text')).color,
                date: taskItem.querySelector('strong:nth-of-type(2)').nextSibling.textContent.trim(),
                time: taskItem.querySelector('strong:nth-of-type(3)').nextSibling.textContent.trim(),
                notes: taskItem.querySelector('strong:nth-of-type(4)').nextSibling.textContent.trim()
            });
        });
        const archivedTasks = [];
        archiveList.querySelectorAll('li').forEach(taskItem => {
            archivedTasks.push({
                text: taskItem.querySelector('.task-text').innerText,
                color: window.getComputedStyle(taskItem).backgroundColor,
                textColor: window.getComputedStyle(taskItem.querySelector('.task-text')).color,
                date: taskItem.querySelector('strong:nth-of-type(2)').nextSibling.textContent.trim(),
                time: taskItem.querySelector('strong:nth-of-type(3)').nextSibling.textContent.trim(),
                notes: taskItem.querySelector('strong:nth-of-type(4)').nextSibling.textContent.trim()
            });
        });
        localStorage.setItem('tasks', JSON.stringify({ tasks, archivedTasks }));
    }

    function loadTasks() {
        const data = JSON.parse(localStorage.getItem('tasks')) || { tasks: [], archivedTasks: [] };
        data.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = 
                `<input type="checkbox"${task.completed ? ' checked' : ''}>
                <div class="task-details" style="background-color: ${task.color};">
                    <strong>Task:</strong> <span class="task-text" style="color: ${task.textColor};">${task.text}</span><br>
                    <strong>Date:</strong> ${task.date}<br>
                    <strong>Time:</strong> ${task.time}<br>
                    <strong>Notes:</strong> ${task.notes}
                </div>
                <button class="edit">Edit</button>
                <button class="delete-btn">Delete</button>
                <input type="color" class="color-picker" value="${rgbToHex(task.color)}">
                <input type="color" class="color-picker" value="${rgbToHex(task.textColor)}">`;

            if (task.completed) {
                taskItem.classList.add('complete-task');
            }

            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this task?')) {
                    archiveTask(taskItem);
                }
            });

            taskList.appendChild(taskItem);
        });

        data.archivedTasks.forEach(task => {
            const archiveItem = document.createElement('li');
            archiveItem.classList.add('archive-item');
            archiveItem.innerHTML = 
                `<div class="task-details" style="background-color: ${task.color};">
                    <strong>Task:</strong> <span class="task-text" style="color: ${task.textColor};">${task.text}</span><br>
                    <strong>Date:</strong> ${task.date}<br>
                    <strong>Time:</strong> ${task.time}<br>
                    <strong>Notes:</strong> ${task.notes}
                </div>`;
            archiveList.appendChild(archiveItem);
        });
    }

    function rgbToHex(rgb) {
        const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(rgb);
        return result ? `#${Number(result[1]).toString(16).padStart(2, '0')}${Number(result[2]).toString(16).padStart(2, '0')}${Number(result[3]).toString(16).padStart(2, '0')}` : '#000000';
    }

    addTaskButton.addEventListener('click', addTask);
    resetButton.addEventListener('click', resetList);
    searchInput.addEventListener('input', searchTasks);
    toggleDarkModeButton.addEventListener('click', toggleDarkMode);

    loadTasks();
});
