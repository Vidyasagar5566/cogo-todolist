const taskInput = document.querySelector(".task-input input"),

taskInput1 = document.querySelector(".task-input1 input");
taskInput1.text = "A";
function catogery_func(sel1) {
    taskInput1.text = sel1.options[sel1.selectedIndex].text;
  }

const taskInput2 = document.querySelector(".task-input2 input");
taskInput2.text = "School Work";
function tag_func(sel2) {
    taskInput2.text = sel2.options[sel2.selectedIndex].text;
  }

const taskInput3 = document.querySelector(".task-input3 input");
taskInput3.text = "low";
function priority_func(sel3) {
    taskInput3.text = sel3.options[sel3.selectedIndex].text;
  }

const taskInput4 = document.querySelector(".task-input4 input"),

filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
add_task = document.querySelector(".add_task_button"),
taskBox = document.querySelector(".task-box");
let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all" || filter == todo.priority || filter == todo.catogery || filter == todo.tag) {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}" style = "clear:left;"><span style = "color:blue;font-weight:bold;">TASK    :-</span> ${ todo.name}</p>
                                <p class="${completed}" style = "clear:left;"><span style = "color:blue;font-weight:bold;">CATOGERY    :-</span>${ todo.catogery}</p>
                                <p class="${completed}" style = "clear:left;"><span style = "color:blue;font-weight:bold;">TAG    :-</span>${ todo.tag}</p>
                                <p class="${completed}" style = "clear:left;"><span style = "color:blue;font-weight:bold;">PRIORITY     :-</span>${ todo.priority}</p>
                                <p class="${completed}" style = "clear:left;"><span style = "color:blue;font-weight:bold;">DUE-DATE     :-</span>${ todo.due_date}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}","${todo.catogery}","${todo.tag}","${todo.priority}","${todo.due_date}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}
function editTask(taskId, name,catogery,tag,priority,due_date) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = name;
    taskInput1.value = catogery;
    taskInput2.value = tag;
    taskInput3.value = priority;
    taskInput4.value = due_date;

    taskInput.focus();
    taskInput1.focus();
    taskInput2.focus();
    taskInput3.focus();
    taskInput4.focus();
    taskInput.classList.add("active");
    taskInput1.classList.add("active");
    taskInput2.classList.add("active");
    taskInput3.classList.add("active");
    taskInput4.classList.add("active");
}
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});
add_task.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    let userTask1 = taskInput1.text;
    let userTask2 = taskInput2.text;
    let userTask3 = taskInput3.text;
    let userTask4 = taskInput4.value.trim();

        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending",
                            catogery:userTask1,tag:userTask2,priority:userTask3,due_date:userTask4};
            todos.splice(0, 0, taskInfo); 
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
            todos[editId].catogery = userTask1;
            todos[editId].tag = userTask2;
            todos[editId].priority = userTask3;
            todos[editId].due_date = userTask4;
        }
        taskInput.value = "";
        taskInput1.value = "";
        taskInput2.value = "";
        taskInput3.value = "";
        taskInput4.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    
});