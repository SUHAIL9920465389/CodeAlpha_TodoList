document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load saved tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('complete')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the list
    const addTaskToList = (text, completed = false) => {
        const li = document.createElement('li');
        if (completed) li.classList.add('complete');
        
        const span = document.createElement('span');
        span.innerText = text;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteButton);
        li.onclick = () => {
            li.classList.toggle('complete');
            saveTasks();
        };

        taskList.appendChild(li);
    };

    // Add task when button is clicked
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});
