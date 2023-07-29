const taskInput = document.querySelector(".task-input input"),

taskInput1 = document.querySelector(".task-input1 input");
taskInput1.text = "A";
function catogery_func(sel1) {
    taskInput1.text = sel1.options[sel1.selectedIndex].text;
  }

const taskInput2 = document.querySelector(".task-input2 input");
taskInput2.text = "home Work";
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
    let liTag = "<h1>Tasks</h1><br>";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all" || filter == todo.priority || filter == todo.catogery || filter == todo.tag) {
                liTag += `
                <section draggable="true" style = "cursor: grab;" class = "task" data-id="${id}"> 
                <h3 style = "color:blue;font-weight:bold;">Main Task  - ${id}</h3>
                <br>
                <li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">TASK    :-</span> ${ todo.name}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">CATOGERY    :-</span>${ todo.catogery}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">TAG    :-</span>${ todo.tag}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">PRIORITY     :-</span>${ todo.priority}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">DUE-DATE     :-</span>${ todo.due_date}</p>
                    </label>
                    <div class="settings">
                    
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h" id = "eit-del-option"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${todo.name}","${todo.catogery}","${todo.tag}","${todo.priority}","${todo.due_date}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>
                <h6 style = "color:blue;">Add/View subtasks</h6>
                <input type = "text" placeholder = "Add subtask here" class = "sub_task_input">
                <input type = "submit" value = "Add sub-task" onclick="Add_sub_tasks(${id})">
                <input type = "submit" value = "view-sub-tasks" onclick="view_sub_tasks(${id})">
                <input type = "submit" value = "close-sub-tasks" onclick="close_sub_tasks(${id})">
                <ol class="sub-task-box${id}"></ol>
                </section>
                <br>
                <br>
                <hr>
                <br>
                <br>`;


            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 1000 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}

function fetchTodos(){

    var filter = document.getElementById('input-search').value;
    let liTag = "<h1>Tasks</h1>";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all" || filter == todo.priority || filter == todo.catogery || filter == todo.tag || filter == todo.due_date || todo.name.includes(filter)) {
                liTag += `
                <section draggable="true" style = "cursor: grab;" class = "task" data-id="${id}"> 
                <h3 style = "color:blue;font-weight:bold;">Main Task  - ${id}</h3>
                <br>
                <li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">TASK    :-</span> ${ todo.name}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">CATOGERY    :-</span>${ todo.catogery}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">TAG    :-</span>${ todo.tag}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">PRIORITY     :-</span>${ todo.priority}</p>
                        <p class="${completed}" style = "clear:left;"><span style = "font-weight:bold;">DUE-DATE     :-</span>${ todo.due_date}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h" id = "eit-del-option"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${todo.name}","${todo.catogery}","${todo.tag}","${todo.priority}","${todo.due_date}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>
                <h6 style = "color:blue;">Add/View subtasks</h6>
                <input type = "text" placeholder = "Add subtask here" class = "sub_task_input">
                <input type = "submit" value = "Add sub-task" onclick="Add_sub_tasks(${id})">
                <input type = "submit" value = "view-sub-tasks" onclick="view_sub_tasks(${id})">
                <input type = "submit" value = "close-sub-tasks" onclick="close_sub_tasks(${id})">
                <ul class="sub-task-box${id}"></ul>
                </section>
                <br>
                <br>
                <hr>
                <br>
                <br>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 1000 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}



showTodo("all");


function view_sub_tasks(id) {
    var just = ".sub-task-box" + id.toString();
    const subtaskBox = document.querySelector(just);
    todos = JSON.parse(localStorage.getItem("todo-list"));
    let liTag = "";
    todos[id].sub_task.forEach((task,id1) => {
        liTag += `<li draggable="true" style = "cursor: grab;" class = "subtask" data-id="${id}/${id1}">${task.sub_task}</li>`;
    });
    subtaskBox.innerHTML = liTag;
}

function Add_sub_tasks(id) {
    const taskInput5 = document.querySelector(".sub_task_input");
    let text = taskInput5.value.trim();
    taskInput5.value = "";
    todos[id].sub_task.splice(0, 0, {'sub_task':text});
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
    showTodo(document.querySelector("span.active").id);


}

function close_sub_tasks(id){
    var just = ".sub-task-box" + id.toString();
    const subtaskBox = document.querySelector(just);
    subtaskBox.innerHTML = '';
}

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
            let taskInfo = {name: userTask,sub_task:[], status: "pending",
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


// Drag And Drop Task

document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll(".task");
    const subtasks = document.querySelectorAll(".subtask");
  
    tasks.forEach(task => {
      task.addEventListener("dragstart", dragStart);
      task.addEventListener("dragover", dragOver);
      task.addEventListener("drop", drop);
    });

    subtasks.forEach(subtask => {
        subtask.addEventListener("dragstart", dragStart1);
        subtask.addEventListener("dragover", dragOver1);
        subtask.addEventListener("drop", drop1);
      });
  });
  
  
  let draggedTask;
  let draggedsubTask;

  
  function dragStart(event) {
    draggedTask = event.target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
  }
  
  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  
  function drop(event) {
    event.preventDefault();
  
    // Get the IDs of the tasks being swapped
    const draggedId = draggedTask.dataset.id;
    const droppedId = event.target.dataset.id;
    console.log(draggedId);
    console.log(droppedId);

    var temp = todos[draggedId];
    todos[draggedId] = todos[droppedId];
    todos[droppedId] = temp;
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
    
  }

//SUB TASKS
    
  function dragStart1(event) {
    draggedTask = event.target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
  }
  
  function dragOver1(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  
  function drop1(event) {
    event.preventDefault();
  
    // Get the IDs of the tasks being swapped
    const draggedId = draggedTask.dataset.id;
    const droppedId = event.target.dataset.id;
    var task_id = draggedId.split('/')[0];
    var subtask_draggedId = draggedId.split('/')[1];
    var subtask_droppedId = droppedId.split('/')[1];

    var temp = todos[task_id].sub_task[subtask_draggedId];
    todos[task_id].sub_task[subtask_draggedId] = todos[task_id].sub_task[subtask_droppedId];
    todos[task_id].sub_task[subtask_droppedId] = temp;

    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
    
  }