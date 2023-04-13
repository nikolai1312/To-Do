function uid() {
    return Date.now().toString(5) + Math.random().toString(5).substring(2);
}

let dadosTarefas = [
    {
        id: uid(),
        conteudo: "Sipa que funcionou",
        toDo: true
    },
    {
        id: uid(),
        conteudo: "Sipa que funcionou 2 vezes!",
        toDo: true
    }
]

const tarefaInput = document.getElementById("taskInput");
const tarefaBtn = document.getElementById("taskBtn");
const tarefaLista = document.getElementById("taskLista");
const contadorCriada = document.getElementById("task_criada");
const contadorConcluida = document.getElementById("task_concluida");
const boardVazio = document.getElementById("board_vazio");

// Board vazio 

function checkListaVazia() {
    return dadosTarefas.length === 0 ? boardVazio.classList.remove("hidden")
        : boardVazio.classList.add("hidden");
}

// contador 

function contador() {
    let tarefaConcluida = 0;
    let tarefaCriada = dadosTarefas.length;

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
    iconeCircle.addEventListener("onclick", concluirTarefa());

    let checkCircle = document.createElement("i");
    checkCircle.classList.add("ph-bold");
    checkCircle.classList.add("ph-check-circle");
    checkCircle.classList.add("botao_check");
    checkCircle.classList.add("hidden");
    checkCircle.addEventListener("onclick", taskAberta());

    let conteudoTarefa = document.createElement("p");
    conteudoTarefa.innerHTML = conteudoTask;

    let botaoDelete = document.createElement("i");
    botaoDelete.classList.add("ph-bold ph-trash botao_excluir");
    botaoDelete.classList.add("ph-trash");
    botaoDelete.classList.add("botao_excluir");
    botaoDelete.addEventListener("onclick", deletarTask());

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

    const novoConteudo = tarefaInput.nodeValue;

    const novaTask = {
        id: uid(),
        conteudo: novoConteudo,
        toDo: true,
    }

    dadosTarefas.push(novaTask);
    const elementoTask = criarElementoTask(novaTask.conteudo, novaTask.id);
    tarefaLista.appendChild(elementoTask);

    tarefaInput.value = '';
    contador();
    checkListaVazia();
}

// Tarefas concluídas
function concluirTarefa(event) {
    console.log('Complete task');

    const iconeCirculo = event.target;
    iconeCirculo.classList.add("hidden");

    const texto = iconeCirculo.parentNode.childNodes[2];
    texto.classList.add("textoRiscado");

    const taskConcluidaID = iconeCirculo.parentNode.parentNode.id;
    const taskConcluida = document.getElementById(taskConcluidaID);

    taskConcluida.classList.add("completa");
    taskConcluida.classList.remove("toDo");

    const iconeCheck = iconeCirculo.parentNode.childNodes[1];
    iconeCheck.classList.remove("hidden");

    dadosTarefas.find((item) => {
        if (item.id === taskConcluidaID) {
            item.toDo = false;
        }
    })

    contador();
}

// Tarefas abertas

function taskAberta(event) {
    console.log('Incomplete task');

    const iconeCheck = event.target;
    iconeCheck.classList.add("hidden");

    const texto = iconeCheck.parentNode.childNodes[2];
    texto.classList.remove("textoRiscado");

    const taskIncompletaID = iconeCheck.parentNode.parentNode.id;
    const taskIncompleta = document.getElementById(taskIncompletaID);

    taskIncompleta.classList.add("toDo");
    taskIncompleta.classList.remove("completa");

    const iconeCircle = doneIcon.parentNode.childNodes[0];
    iconeCircle.classList.remove("hidden");

    dadosTarefas.find((item) => {
        if (item.id === taskIncompletaID) {
            item.toDo = true;
        }
    });

    contador();
}

// Deletar tarefas

function deletarTask(event) {
    console.log('Delete Task');

    const taskDeleteID = event.target.parentNode.id;
    const taskDelete = document.getElementById(taskDeleteID);

    const tasksSemDeletar = dadosTarefas.filter(
        (task) => {
            return task.id !== taskDeleteID;
        }
    );

    dadosTarefas = tasksSemDeletar;
    tarefaLista.removeChild(taskDelete);

    contador();
    checkListaVazia();
}

for (const task of dadosTarefas) {
    const taskItem = criarElementoTask(task.conteudo, task.id);
    tarefaLista.appendChild(taskItem);
}