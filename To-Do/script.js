const taskList = document.getElementById('taskList');
let taskId = 3; // Start ID after initial tasks
const listToggle = document.getElementById('list_toggle');

// Initial tasks array
let tasks = [
    { id: 1, title: "Finish CSS Styling", description: "", completed: false },
    { id: 2, title: "Create HTML Structure", description: "Implement the 3D flip effect", completed: true }
];

/**
 * Renders all tasks from the 'tasks' array to the 'taskList' div.
 */
function renderTasks() {
    // Clear the current list display
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const listItem = document.createElement('div');
        // Add 'done' class if task is completed
        listItem.className = `list_item ${task.completed ? 'done' : ''}`;
        
        // Use a container for the checkbox and label
        listItem.innerHTML = `
            <div class="list_item-main">
                <input type="checkbox" id="task_${task.id}" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id})">
                <label for="task_${task.id}">${task.title}</label>
                
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    &times;
                </button>
            </div>
            ${task.description ? `<div class="description">${task.description}</div>` : ''}
        `;
        
        taskList.appendChild(listItem);
    });
}

/**
 * Handles adding a new task from the form on the back side of the card.
 */
function addTask() {
    const titleInput = document.getElementById('taskTitleInput');
    const descInput = document.getElementById('taskDescInput');
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (title === "") {
        alert("Please enter a task title!");
        return;
    }

    // Assign a unique ID and increment the counter
    const newId = taskId++; 

    const newTask = {
        id: newId,
        title: title,
        description: description,
        completed: false
    };

    tasks.push(newTask); // Add the new task to the array
    renderTasks(); // Re-render the list to show the new item

    // Clear the inputs
    titleInput.value = '';
    descInput.value = '';

    // Flip back to the list view by unchecking the hidden checkbox
    listToggle.checked = false;
}

/**
 * Toggles the 'completed' status of a task by its ID.
 */
function toggleTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks(); // Re-render to apply/remove the line-through style
    }
}

/**
 * NEW: Filters the tasks array to remove the task with the given ID.
 */
function deleteTask(id) {
    // Overwrite the tasks array with a new array excluding the task with the matching ID
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); // Re-render the list
}

// Renders the initial tasks when the script loads
renderTasks();