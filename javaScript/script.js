const taskInput = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")
const errorMsg = document.getElementById("errorMsg")
const addTaskBtn = document.getElementById("addTaskBtn")

addTaskBtn.addEventListener("click", function () {

    const text = taskInput.value.trim();

    if (text === "") {
        errorMsg.textContent = "Task cannot be empty"
        return;
    }

    errorMsg.textContent = ""
    taskInput.value = ""
    const task = document.createElement("div")
    task.className = "task-item"

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const taskText = document.createElement("span")
    taskText.textContent = text;
    taskText.className = "task-text"

    const editInput = document.createElement("input")
    editInput.value = text;
    editInput.className = "edit-input form-control form-control-sm"
    editInput.style.display = "none"

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit"
    editBtn.className = "btn btn-warning btn-sm me-2 px-3 py-1"

    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save"
    saveBtn.className = "btn btn-success btn-sm me-2 px-3 py-1 d-none"

    const cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "btn btn-secondary btn-sm me-2 px-3 py-1 d-none"

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "btn btn-danger btn-sm px-3 py-1"

    checkbox.addEventListener("change", function () {
        taskText.classList.toggle("completed")
        updateStats()
    });
    editBtn.addEventListener("click", function () {
        taskText.style.display = "none"
        editInput.style.display = "block"

        editBtn.classList.add("d-none")
        saveBtn.classList.remove("d-none")
        cancelBtn.classList.remove("d-none")
    });

    saveBtn.addEventListener("click", function () {
        if (editInput.value.trim() === "") {
            errorMsg.textContent = "Task cannot be empty"
            return;
        }

        if (editInput.value === taskText.textContent) {
            errorMsg.textContent = "No changes made"
            return;
        }

        taskText.textContent = editInput.value;
        closeEdit()
    });

    cancelBtn.addEventListener("click", closeEdit)
    deleteBtn.addEventListener("click", function () {
        task.remove()
        updateStats()
    });

    const left = document.createElement("div")
    left.className = "task-left"
    left.append(checkbox, taskText, editInput)

    const buttons = document.createElement("div")
    buttons.append(editBtn, saveBtn, cancelBtn, deleteBtn)

    const row = document.createElement("div")
    row.className = "task-row"
    row.append(left, buttons)

    task.append(row)
    taskList.append(task)

    updateStats()

    function closeEdit() {
        taskText.style.display = "block"
        editInput.style.display = "none"

        editBtn.classList.remove("d-none")
        saveBtn.classList.add("d-none")
        cancelBtn.classList.add("d-none")

        errorMsg.textContent = ""
    }
});

function updateStats() {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll("input:checked").length

    document.getElementById("totalCount").textContent = total
    document.getElementById("completedCount").textContent = completed
    document.getElementById("pendingCount").textContent = total - completed
}

