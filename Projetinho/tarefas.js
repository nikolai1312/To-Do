function uid() {
    return Date.now().toString(5) + Math.random().toString(5).substring(2);
}

let dadosTarefas = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks'))
    : [];


function memoriaNavegadorSet(item) {
    localStorage.setItem('tasks', JSON.stringify(item));
}

// let dadosTarefas = []

const tarefaInput = document.getElementById("taskInput");
const tarefaBtn = document.getElementById("taskBtn");
const tarefaLista = document.getElementById("taskLista");
const contadorCriada = document.getElementById("task_criada");
const contadorConcluida = document.getElementById("task_concluida");
const boardVazio = document.getElementById("board_vazio");

// Board vazio 

function checkListaVazia() {
    return dadosTarefas.length < 1 ? boardVazio.classList.remove("hidden")
        : boardVazio.classList.add("hidden");
}

// contador 

function contador() {
    let tarefaConcluida = 0;
    let tarefaCriada = 0;

    tarefaCriada = dadosTarefas.length;
    contadorCriada.innerText = `${tarefaCriada}`;


    for (const tarefa of dadosTarefas) {
        tarefa.toDo === false ? tarefaConcluida++ : null;
    }

    contadorConcluida.innerText = `${tarefaConcluida}`;
}

checkListaVazia();
contador();


// Criar elemento HTML
function criarElementoTask(conteudoTask, taskID) {
    let task = document.createElement("li");
    task.classList.add("task");
    task.setAttribute("id", taskID);

    let conteudoEsq = document.createElement("div");
    conteudoEsq.classList.add("conteudo_esquerdo");

    let iconeCircle = document.createElement("i");
    iconeCircle.classList.add("ph-bold");
    iconeCircle.classList.add("ph-circle");
    iconeCircle.classList.add("botao_check");
    iconeCircle.addEventListener("click", concluirTarefa);

    let checkCircle = document.createElement("i");
    checkCircle.classList.add("ph-bold");
    checkCircle.classList.add("ph-check-circle");
    checkCircle.classList.add("botao_checked");
    checkCircle.classList.add("hidden");
    checkCircle.addEventListener("click", taskAberta);

    let conteudoTarefa = document.createElement("p");
    conteudoTarefa.innerText = conteudoTask;

    let botaoDelete = document.createElement("i");
    botaoDelete.classList.add("ph-bold");
    botaoDelete.classList.add("ph-trash");
    botaoDelete.classList.add("botao_excluir");
    botaoDelete.addEventListener("click", deletarTask);

    conteudoEsq.appendChild(iconeCircle);
    conteudoEsq.appendChild(checkCircle);
    conteudoEsq.appendChild(conteudoTarefa);

    task.appendChild(conteudoEsq);
    task.appendChild(botaoDelete);

    return task;
}

// Adicionar novas tarefas
function criarTask(event) {
    event.preventDefault()

    const novoConteudo = tarefaInput.value;

    const novaTask = {
        id: uid(),
        conteudo: novoConteudo,
        toDo: true,
    }

    if (novoConteudo.length === 0) {
        return null;
    } else {
        dadosTarefas.push(novaTask);
        const elementoTask = criarElementoTask(novaTask.conteudo, novaTask.id);
        tarefaLista.appendChild(elementoTask);
    }

    tarefaInput.value = '';
    contador();
    checkListaVazia();
    memoriaNavegadorSet(dadosTarefas);
}

// Tarefas concluídas
function concluirTarefa(event) {

    const iconeCirculo = event.target;
    iconeCirculo.classList.add("hidden");

    const texto = iconeCirculo.parentNode.childNodes[2];
    texto.classList.add("textoRiscado");

    const taskConcluidaID = iconeCirculo.parentNode.parentNode.id;
    const taskConcluida = document.getElementById(taskConcluidaID);

    taskConcluida.classList.add("concluida");
    taskConcluida.classList.remove("toDo");

    const iconeCheck = iconeCirculo.parentNode.childNodes[1];
    iconeCheck.classList.remove("hidden");

    dadosTarefas.find((item) => {
        if (item.id === taskConcluidaID) {
            item.toDo = false;
        }
    })

    memoriaNavegadorSet(dadosTarefas);
    contador();
}

// Tarefas abertas

function taskAberta(event) {

    const iconeCheck = event.target;
    iconeCheck.classList.add("hidden");

    const texto = iconeCheck.parentNode.childNodes[2];
    texto.classList.remove("textoRiscado");

    const taskIncompletaID = iconeCheck.parentNode.parentNode.id;
    const taskIncompleta = document.getElementById(taskIncompletaID);

    taskIncompleta.classList.add("toDo");
    taskIncompleta.classList.remove("completa");

    const iconeCircle = iconeCheck.parentNode.childNodes[0];
    iconeCircle.classList.remove("hidden");

    dadosTarefas.find((item) => {
        if (item.id === taskIncompletaID) {
            item.toDo = true;
        }
    });

    memoriaNavegadorSet(dadosTarefas);
    contador();
}

// Deletar tarefas

function deletarTask(event) {
    const taskDeleteID = event.target.parentNode.id;
    const taskDelete = document.getElementById(taskDeleteID);

    const tasksSemDeletar = dadosTarefas.filter(
        (task) => {
            return task.id !== taskDeleteID;
        }
    );

    localStorage.clear();
    dadosTarefas = tasksSemDeletar;
    memoriaNavegadorSet(dadosTarefas);
    tarefaLista.removeChild(taskDelete);

    contador();
    checkListaVazia();
}

function tarefaConcluida(elemento) {
    let filtro = dadosTarefas.filter(x => x.toDo === false);
    let tarefasCheck = [];
    for (const tarefa of filtro) {
        tarefa = criarElementoTask(elemento.conteudo, elemento.id);
        tarefa.childNodes[0].classList.add("hidden");
        tarefa.childNodes[1].classList.remove("hidden");
        tarefa.classList.add("concluida");
        tarefa.childNodes[2].classList.add("textoRiscado");
        tarefa.classList.remove("toDo");
        tarefasCheck.push(tarefa);
    }
    return criarElementoTask(tarefasCheck.conteudo, tarefasCheck.id);
}

function memoriaAntiga() {

    dadosTarefas.forEach((tarefa) => {
        let elementosAnteriores = criarElementoTask(tarefa.conteudo, tarefa.id);
        //let elementosAnterioresCheck = tarefaConcluida(elementosAnteriores);
        tarefaLista.appendChild(elementosAnteriores);
        //tarefaLista.appendChild(elementosAnterioresCheck);
    });
}

window.onload = { memoriaAntiga }

for (const task of dadosTarefas) {
    const taskItem = criarElementoTask(task.conteudo, task.id);
    tarefaLista.appendChild(taskItem);
}