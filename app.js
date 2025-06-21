let tasks = [];
let filter = 'all';

function isValidTask(name) {
  return name.trim().length >= 5 && isNaN(parseInt(name.trim()[0], 10));
}

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
      task.done = checkbox.checked;
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✍";
    editBtn.className = "edit";
    editBtn.onclick = () => {
      openModal({
        title: "Rename Task",
        msg: "",
        confirm: (newName) => {
          if (isValidTask(newName)) {
            task.text = newName.trim();
            renderTasks();
          }
        },
        needsInput: true,
        defaultInput: task.text
      });
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
      openModal({
        title: "Delete Task?",
        msg: "Are you sure you want to delete this task?",
        confirm: () => {
          tasks.splice(index, 1);
          renderTasks();
        },
        needsInput: false
      });
    };

    actions.appendChild(checkbox);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskItem.appendChild(taskText);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);
  });
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function deleteDoneTasks() {
  tasks = tasks.filter(t => !t.done);
  renderTasks();
}

function handleDeleteAll() {
  if(!tasks[0].empty){
  openModal({
    title: "Delete All Tasks?",
    msg: "Are you sure? if not press cancel.",
    confirm: () => {
      tasks = [];
      renderTasks();
    },
    needsInput: false
  });
}
}

function handleAddTask() {
  const input = document.getElementById("taskInput");
  const msg = document.getElementById("validationMsg");
  const text = input.value.trim();

  if (!isValidTask(text)) {
    msg.textContent = "Task must be ≥ 5 characters and not start with a number.";
    msg.classList.remove("hidden");
    return;
  }
  msg.classList.add("hidden");

  tasks.push({ text, done: false });
  input.value = "";
  renderTasks();
}

// Modal Logic
let modalConfig = {};

function openModal({ title, msg, confirm, needsInput, defaultInput = "" }) {
  modalConfig = { confirm, needsInput };
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMsg").textContent = msg;
  const input = document.getElementById("modalInput");

  if (needsInput) {
    input.classList.remove("hidden");
    input.value = defaultInput;
    input.focus();
  } else {
    input.classList.add("hidden");
  }

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function modalConfirm() {
  const input = document.getElementById("modalInput");
  const msg = document.getElementById("modalMsg");

  if (modalConfig.needsInput) {
    const val = input.value.trim();
    if (!isValidTask(val)) {
      msg.textContent = "Name must be ≥ 5 characters and not start with a number.";
      return;
    }
    modalConfig.confirm(val);
  } else {
    modalConfig.confirm();
  }

  closeModal();
}

renderTasks();
