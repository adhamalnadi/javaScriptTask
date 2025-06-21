let tasks = [];
let filter = 'all';

function renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'done') return task.done;
        if (filter === 'todo') return !task.done;
      });

      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        if (task.done) taskText.classList.add("done");

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.onchange = () => {
          tasks[index].done = checkbox.checked;
          renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.className = "edit";
        editBtn.onclick = () => {
          const newText = prompt("Edit task:", task.text);
          if (newText !== null) {
            tasks[index].text = newText.trim();
            renderTasks();
          }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => {
          tasks.splice(index, 1);
          renderTasks();
        };