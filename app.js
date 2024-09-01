// ddocument.getElementById("formTask"): 
// Esta funcion se encarga de busca en el documento HTML el elemento con el ID "formTask".
// .addEventListener('submit', saveTask);: Añade un event listener al formulario encontrado. 
// Este event listener espera que ocurra un evento de envío (submit) en el formulario. 
// Cuando esto sucede, se ejecutará la función saveTask
document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
    let title = document.getElementById("title").value;
    
    const task = {
        title,
    };

    if (localStorage.getItem("tasks") === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById("formTask").reset();
    e.preventDefault();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let taskView = document.getElementById("tasks");

    taskView.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;

        taskView.innerHTML += 
        `<div class="card mb-3">
        <div>
        <p>${title}
        <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
        </p>
        </div>
        </div>`
        
    }
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    tasks.splice(title, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}
getTasks();