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