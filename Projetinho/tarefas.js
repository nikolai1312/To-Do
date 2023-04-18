function uid() {
    return Date.now().toString(5) + Math.random().toString(5).substring(2);
}

// Get e Set do localStorage

let taskData = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks'))
    : [];


function localStorageSet(item) {
    localStorage.setItem('tasks', JSON.stringify(item));
}


// let taskData = []

const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn");
const taskList = document.getElementById("taskLista");
const counterToDo = document.getElementById("task_criada");
const counterDone = document.getElementById("task_concluida");
const emptyBoard = document.getElementById("board_vazio");

// Board vazio 

function checkEmptyList() {
    return taskData.length < 1 ? emptyBoard.classList.remove("hidden")
        : emptyBoard.classList.add("hidden");
}

// contador

function counter() {
    let tarefaConcluida = 0;
    let tarefaCriada = 0;

    tarefaCriada = taskData.length;
    counterToDo.innerText = `${tarefaCriada}`;


    for (const tarefa of taskData) {
        tarefa.toDo === false ? tarefaConcluida++ : null;
    } counterDone.innerText = `${tarefaConcluida}`;
}

checkEmptyList();
counter();


// Criar elemento HTML
function createElement(taskContent, taskID) {
    let task = document.createElement("li");
    task.classList.add("task");
    task.setAttribute("id", taskID);

    let leftContent = document.createElement("div");
    leftContent.classList.add("conteudo_esquerdo");

    let circleBtn = document.createElement("i");
    circleBtn.classList.add("ph-duotone");
    circleBtn.classList.add("ph-circle");
    circleBtn.classList.add("botao_check");
    circleBtn.addEventListener("click", finishTask);

    let checkBtn = document.createElement("i");
    checkBtn.classList.add("ph-bold");
    checkBtn.classList.add("ph-check-circle");
    checkBtn.classList.add("botao_checked");
    checkBtn.classList.add("hidden");
    checkBtn.addEventListener("click", openTask);

    let taskText = document.createElement("p");
    taskText.innerText = taskContent;

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("ph-bold");
    deleteBtn.classList.add("ph-trash");
    deleteBtn.classList.add("botao_excluir");
    deleteBtn.addEventListener("click", deleteTask);

    leftContent.appendChild(circleBtn);
    leftContent.appendChild(checkBtn);
    leftContent.appendChild(taskText);

    task.appendChild(leftContent);
    task.appendChild(deleteBtn);

    return task;
}

// Adicionar novas tarefas
function addTask(event) {
    event.preventDefault()

    const newContent = taskInput.value;

    const newTask = {
        id: uid(),
        conteudo: newContent,
        toDo: true,
    }

    if (newContent.length === 0) {
        return null;
    } else {
        taskData.push(newTask);
        const elementoTask = createElement(newTask.conteudo, newTask.id);
        taskList.appendChild(elementoTask);
    }

    taskInput.value = '';
    counter();
    checkEmptyList();
    localStorageSet(taskData);
}

// Tarefas concluídas
function finishTask(event) {

    const circleIcon = event.target;
    circleIcon.classList.add("hidden");

    const content = circleIcon.parentNode.childNodes[2];
    content.classList.add("textoRiscado");

    const doneTaskID = circleIcon.parentNode.parentNode.id;
    const doneTask = document.getElementById(doneTaskID);

    doneTask.classList.add("concluida");
    doneTask.classList.remove("toDo");

    const checkIcon = circleIcon.parentNode.childNodes[1];
    checkIcon.classList.remove("hidden");

    taskData.find((item) => {
        if (item.id === doneTaskID) {
            item.toDo = false;
        }
    })

    localStorageSet(taskData);
    counter();
}

// Tarefas abertas

function openTask(event) {

    const checkIcon = event.target;
    checkIcon.classList.add("hidden");

    const content = checkIcon.parentNode.childNodes[2];
    content.classList.remove("textoRiscado");

    const incompleteTaskID = checkIcon.parentNode.parentNode.id;
    const incompleteTask = document.getElementById(incompleteTaskID);

    incompleteTask.classList.add("toDo");
    incompleteTask.classList.remove("concluida");

    const circleBtn = checkIcon.parentNode.childNodes[0];
    circleBtn.classList.remove("hidden");

    taskData.find((item) => {
        if (item.id === incompleteTaskID) {
            item.toDo = true;
        }
    });

    localStorageSet(taskData);
    counter();
}

// Deletar tarefas

function deleteTask(event) {
    const taskDeleteID = event.target.parentNode.id;
    const taskDelete = document.getElementById(taskDeleteID);

    const undoneTask = taskData.filter(
        (task) => {
            return task.id !== taskDeleteID;
        }
    );

    localStorage.clear();
    taskData = undoneTask;
    localStorageSet(taskData);
    taskList.removeChild(taskDelete);

    counter();
    checkEmptyList();
}

let toDoFilter = taskData.filter(x => x.toDo === false);


function previousTasks() {
    taskList.innerText = '';

    taskData.forEach((tarefa) => {
        let previousElements = createElement(tarefa.conteudo, tarefa.id);
        taskList.appendChild(previousElements);

        if (tarefa.toDo === false) {
            previousElements.classList.add('concluida');
            previousElements.classList.remove('toDo');
            previousElements.querySelector('ph-check-circle').classList.remove('hidden');
            previousElements.querySelector('ph-circle').classList.add('hidden');
            previousElements.querySelector('p').classList.add('textoRiscado');
        }

    });
}

window.onload = previousTasks;

for (const task of taskData) {
    const taskItem = createElement(task.conteudo, task.id);
    taskList.appendChild(taskItem);
}