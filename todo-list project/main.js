window.addEventListener('load', () =>{
    const from = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Function to set tasks to localStorage
    const setTasksToLocalStorage = (tasks) => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to get tasks from localStorage
    const getTasksFromLocalStorage = () => {
        const tasksJSON = window.localStorage.getItem('tasks');
        return JSON.parse(tasksJSON) || [];
    };

    // Initialize tasks from localStorage
    let tasks = getTasksFromLocalStorage();

    // Function to render tasks
    const renderTasks = () => {
        list_el.innerHTML = '';
        tasks.forEach((task) => {
            const task_el = createTaskElement(task);
            list_el.appendChild(task_el);
        });
    };

    // Function to create task element
    const createTaskElement = (task) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly","readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML =  'Edit';

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', () => {
            if(task_edit_el.innerText.toLocaleLowerCase() == "edit")
            {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly","readonly");
                task_edit_el.innerText = "Edit";
                // Update task in array and localStorage
                tasks[tasks.indexOf(task)] = task_input_el.value;
                setTasksToLocalStorage(tasks);
            }
        });
        task_delete_el.addEventListener('click',() => {
            list_el.removeChild(task_el);
            // Remove task from array and localStorage
            tasks = tasks.filter(t => t !== task);
            setTasksToLocalStorage(tasks);
        });

        return task_el;
    };

    // Initial rendering of tasks
    renderTasks();

    from.addEventListener('submit',(e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        // Add task to array and localStorage
        tasks.push(task);
        setTasksToLocalStorage(tasks);

        // Create and append new task element
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);

        // Clear input
        input.value = '';
    });
});
