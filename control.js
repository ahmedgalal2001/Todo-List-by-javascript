let txt_password = document.getElementById("txt_password");
let txt_username = document.getElementById("txt_username");
let txttask = document.getElementById("txt_task");
let btn_submit = document.getElementById("btn_submit");
let btn_add = document.getElementById("btn_add");
let btn_logout = document.getElementById("btn_logout");
let main_content = document.getElementById("main");
let msgwlecome = document.getElementById("msgwlecome");
let form = document.getElementById("form-login");
let tasks = document.getElementById("tasks");
let lists = document.getElementById("lists");

// to display tasks and hiden the form
if (localStorage.getItem("user")) {
  form.style.display = "none";
  tasks.style.display = "block";
  listTasks();
}

// to create User and add him in Localstorage
btn_submit.onclick = function () {
  let username = checkString(txt_username.value);
  let password = checkString(txt_password.value);
  if (username && password) {
    let id = Math.random();
    let user = new User(id, username, password);
    user.Login = true;
    localStorage.setItem("user", JSON.stringify(user));
    location.reload();
  }
};

// to create object from class Task and putting the changes in localstorage
btn_add.onclick = function () {
  let nametask = checkString(txttask.value);
  if (nametask) {
    let user = JSON.parse(localStorage.getItem("user"));
    let id = Math.random();
    let task = new Task(id, nametask, "#ffffff");
    user.tasks.push(task);
    localStorage.setItem("user", JSON.stringify(user));
  }
  location.reload();
};

// to remove user from localstorage
btn_logout.onclick = function () {
  localStorage.clear();
  location.reload();
};

// To create all tasks from Localstorage
function listTasks() {
  let user = JSON.parse(localStorage.getItem("user"));
  let tasks = user.tasks;
  msgwlecome.innerText = `Welcome Mr/Mrs ${user.user}`;
  for (let task in tasks) {
    createTask(tasks[task].id, tasks[task].name, tasks[task].done);
  }
}

// to build task
function createTask(id, name, done) {
  let task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("id", id);
  task.style.backgroundColor = done;

  let nametask = document.createElement("p");
  nametask.appendChild(document.createTextNode(name));

  let btns = document.createElement("div");

  let btn_done = document.createElement("button");
  btn_done.classList.add("btn");
  btn_done.appendChild(document.createTextNode("✔"));
  btn_done.style.backgroundColor = "#5CB85C";
  btn_done.style.marginRight = "5px";

  // btn to change color if the task done
  btn_done.onclick = function () {
    if (done != "rgb(180 241 155)") {
      let user = JSON.parse(localStorage.getItem("user"));
      let task = user.tasks.findIndex((ta) => ta.id === id);
      if (task > -1) {
        user.tasks[task].done = "rgb(180 241 155)";
        localStorage.setItem("user", JSON.stringify(user));
        location.reload();
      }
    }
  };

  let btn_del = document.createElement("button");
  btn_del.classList.add("btn");
  btn_del.appendChild(document.createTextNode("✘"));
  btn_del.style.backgroundColor = "#D9534F";

  // btn to delete task
  btn_del.onclick = function () {
    let user = JSON.parse(localStorage.getItem("user"));
    let task = user.tasks.findIndex((ta) => ta.id === id);
    if (task > -1) {
      user.tasks.splice(task, 1);
    }
    localStorage.setItem("user", JSON.stringify(user));
    location.reload();
  };

  btns.appendChild(btn_done);
  btns.appendChild(btn_del);

  task.appendChild(nametask);
  task.appendChild(btns);
  lists.appendChild(task);
}

function checkNull(_str) {
  return _str != null;
}

function checkString(_str) {
  if (checkNull(_str)) {
    let str = _str.trim();
    if (str == "") return false;
    else return str;
  }
  return false;
}
