const exercicioSecao = document.getElementById("exercicio");
const painelLista = document.querySelector(".painelLista");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const formTarefa = document.getElementById("formTarefa");
const novaTarefaInput = document.getElementById("novaTarefaInput");
const listaDisplay = document.getElementById("listaDisplay");
const listaConcluidas = document.getElementById("listaConcluidas");
const btnAdicionarItem = document.getElementById("btnAdicionarItem");

const listaTarefaMemo = JSON.parse(localStorage.getItem('lista')) || [];
const tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas')) || [];

const criarLista = (tarefa) => {
  let novaTarefa = document.createElement('tr');
  novaTarefa.classList.add("novaTarefa");

  let celulaMarcadorTarefa = document.createElement('td');
  celulaMarcadorTarefa.classList.add("celulaMarcadorTarefa");
  let marcadorTarefa = document.createElement('div');
  marcadorTarefa.classList.add("marcadorTarefa");
  celulaMarcadorTarefa.appendChild(marcadorTarefa);
  novaTarefa.appendChild(celulaMarcadorTarefa);

  let celulaTarefaNome = document.createElement('td');
  celulaTarefaNome.classList.add("celulaTarefaNome");
  celulaTarefaNome.setAttribute("colspan", "10");
  let tarefaNome = document.createElement('h4');
  tarefaNome.classList.add("tarefaNome");
  tarefaNome.textContent = tarefa.nome;
  celulaTarefaNome.appendChild(tarefaNome);
  novaTarefa.appendChild(celulaTarefaNome);

  let celulaTarefaEditar = document.createElement('td');
  celulaTarefaEditar.classList.add("celulaTarefaEditar");
  let tarefaEditar = document.createElement('div');
  tarefaEditar.classList.add("tarefaEditar");
  celulaTarefaEditar.appendChild(tarefaEditar);
  novaTarefa.appendChild(celulaTarefaEditar);

  let celulaTarefaExcluir = document.createElement('td');
  celulaTarefaExcluir.classList.add("celulaTarefaExcluir");
  let tarefaExcluir = document.createElement('div');
  tarefaExcluir.classList.add("tarefaExcluir");
  celulaTarefaExcluir.appendChild(tarefaExcluir);
  novaTarefa.appendChild(celulaTarefaExcluir);

  if (tarefa.concluida) {
    listaConcluidas.appendChild(novaTarefa);
  } else {
    listaDisplay.appendChild(novaTarefa);
  }

  marcadorTarefa.addEventListener("click", () => {
    marcarTarefa(novaTarefa);
  });

  tarefaEditar.addEventListener("click", () => {
    editarTarefa(novaTarefa);
  });

  tarefaExcluir.addEventListener("click", () => {
    excluirTarefa(novaTarefa);
  });
};

const marcarTarefa = (tarefa) => {
  const marcador = tarefa.querySelector(".marcadorTarefa");
  tarefa.classList.toggle("confirmado");
  marcador.classList.toggle("marcadorTarefa");
  marcador.classList.toggle("marcadorTarefaCheked");
  marcador.classList.toggle("marcadorTarefaConcluida");

  const tarefaNome = tarefa.querySelector(".tarefaNome").textContent;
  if (tarefa.classList.contains("confirmado")) {
    tarefasConcluidas.push({ nome: tarefaNome });
    localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));

    listaConcluidas.appendChild(tarefa);
    listaDisplay.removeChild(tarefa); // Remove da lista ativa
  } else {
    const indice = listaTarefaMemo.findIndex(t => t.nome === tarefaNome);
    if (indice > -1) {
      listaTarefaMemo[indice].concluida = !listaTarefaMemo[indice].concluida;
      localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
    }

    listaDisplay.appendChild(tarefa); // Move para a lista ativa
    listaConcluidas.removeChild(tarefa); // Remove da lista de concluídas
  }

  if (tarefasConcluidas.length > 5) {
    tarefasConcluidas.shift();
    localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));
  }
};

const editarTarefa = (tarefa) => {
  const tarefaNome = tarefa.querySelector(".tarefaNome").textContent;
  novaTarefaInput.value = tarefaNome;
  btnAdicionarItem.textContent = "Salvar";

  btnAdicionarItem.removeEventListener("click", adicionarTarefa);
  btnAdicionarItem.addEventListener("click", () => {
    salvarEdicao(tarefa);
  });
};

const salvarEdicao = (tarefa) => {
  const novaTarefa = novaTarefaInput.value;
  if (novaTarefa) {
    const indice = listaTarefaMemo.findIndex(t => t.nome === tarefa.querySelector(".tarefaNome").textContent);
    if (indice > -1) {
      listaTarefaMemo[indice].nome = novaTarefa;
      localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
      tarefa.querySelector(".tarefaNome").textContent = novaTarefa;
      btnAdicionarItem.textContent = "Adicionar";
      btnAdicionarItem.removeEventListener("click", salvarEdicao);
      btnAdicionarItem.addEventListener("click", adicionarTarefa);
      novaTarefaInput.value = "";
    }
  }
};

const excluirTarefa = (tarefa) => {
  const tarefaNome = tarefa.querySelector(".tarefaNome").textContent;
  if (tarefa.parentElement === listaDisplay) {
    listaDisplay.removeChild(tarefa);
  } else {
    listaConcluidas.removeChild(tarefa);
  }

  const indice = listaTarefaMemo.findIndex(t => t.nome === tarefaNome);
  if (indice > -1) {
    listaTarefaMemo.splice(indice, 1);
    localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
  }
};

window.addEventListener("load", () => {
  listaTarefaMemo.forEach((tarefa) => {
    criarLista(tarefa);
  });

  tarefasConcluidas.forEach((tarefa) => {
    const tarefaElemento = listaDisplay.querySelector(`.tarefaNome:contains("${tarefa.nome}")`).closest("tr");
    if (tarefaElemento) {
      marcarTarefa(tarefaElemento);
    }
  });
});

formTarefa.addEventListener("submit", (event) => {
  event.preventDefault();
  const novaTarefa = novaTarefaInput.value;
  if (novaTarefa) {
    const tarefa = { nome: novaTarefa };
    criarLista(tarefa);
    listaTarefaMemo.push(tarefa);
    localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
    novaTarefaInput.value = "";
  }
});

window.addEventListener("scroll", () => {
  const posicaoExercicio = exercicioSecao.getBoundingClientRect().top;

  if (posicaoExercicio <= 400 && window.innerWidth >= 800) {
    painelLista.style.position = "fixed";
    painelLista.style.top = "128px";
    painelLista.style.left = "32px";
    exercicioConteudo.style.justifyContent = "flex-end";
  } else {
    painelLista.style.position = "unset";
    exercicioConteudo.style.justifyContent = "center";
  }
});