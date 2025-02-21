document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".task-list");
    const newTaskBtn = document.querySelector(".new-task-btn");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks to the DOM
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="radio" name="task" ${task.completed ? "checked" : ""} data-index="${index}" class="task-checkbox">
                ${task.completed ? `<del>${task.text}</del>` : task.text}
                <span class="delete-icon" data-index="${index}">🗑️</span>
            `;
            taskList.appendChild(li);
        });
    }

    // Add new task
    newTaskBtn.addEventListener("click", () => {
        const taskText = prompt("Enter a new task:");
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            renderTasks();
            saveTasks();
        }
    });

    // Toggle task completion
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("task-checkbox")) {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            saveTasks();
        } else if (e.target.classList.contains("delete-icon")) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
