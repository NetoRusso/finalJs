console.log("Exercicio 01 Foi!");

const exercicioSecao = document.getElementById("exercicio");
const painelLista = document.querySelector(".painelLista");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const formTarefa = document.getElementById("formTarefa");
const novaTarefaInput = document.getElementById("novaTarefaInput");
const listaDisplay = document.getElementById("listaDisplay");
const listaConcluidas = document.getElementById("listaConcluidas");
const btnAdicionarItem = document.getElementById("btnAdicionarItem");
const botaoGrandeAtivo = document.getElementById("excluir-ativo");
const botaoGrandeConcluido = document.getElementById("excluir-concluido");

let listaTarefaMemo = JSON.parse(localStorage.getItem('lista')) || [];
let tarefasConcluidas = JSON.parse(localStorage.getItem('lista-concluida')) || [];
let tarefaEditarId = 0;

const criarLista = (tarefa) => {

  let novaTarefa = document.createElement('tr');
  novaTarefa.classList.add("novaTarefa");
  novaTarefa.id = tarefa.id;

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
  if (tarefa) {
    let marcador = tarefa.querySelector(".marcadorTarefa");
    tarefa.classList.toggle("confirmado");
    marcador.classList.toggle("marcadorTarefa");
    marcador.classList.toggle("marcadorTarefaConcluida");

    let tarefaNome = tarefa.querySelector(".tarefaNome");

    let pegaBtn = tarefa.querySelector(".tarefaEditar");
    pegaBtn.classList.toggle("tarefaEditar");

    let existeElemento = tarefasConcluidas.find((e) => e.id === tarefa.id);


    if (!existeElemento) {
      tarefasConcluidas.push({ nome: tarefaNome.textContent, id: tarefa.id });
      localStorage.setItem("lista-concluida", JSON.stringify(tarefasConcluidas));
    }

    listaConcluidas.appendChild(tarefa);


    let marcadorTarefaConcluida = document.querySelector(".marcadorTarefaConcluida");

    marcadorTarefaConcluida.addEventListener("click", () => {
      retornarTarefa(tarefa);
    })

    if (tarefasConcluidas.length > 5) {
      let primeira = tarefasConcluidas.shift()
      localStorage.setItem("lista-concluida", JSON.stringify(tarefasConcluidas));
      const id = document.getElementById(`${primeira.id}`);
      id.remove();
      const remover = listaTarefaMemo.filter((e) => e.id !== Number(primeira.id));
      listaTarefaMemo = remover;
      localStorage.setItem("lista", JSON.stringify(remover));
    }
  }

};


const retornarTarefa = (tarefa) => {

  if (tarefa) {
    let marcador = tarefa.querySelector(".marcadorTarefaConcluida");
    tarefa.classList.toggle("confirmado");
    marcador.classList.toggle("marcadorTarefa");
    marcador.classList.toggle("marcadorTarefaConcluida");

    let tarefaNome = tarefa.querySelector(".tarefaNome");
    let pegaBtn = tarefa.querySelector(".celulaTarefaEditar div");
    pegaBtn.classList.toggle("tarefaEditar");

    listaDisplay.appendChild(tarefa);

    let existeElemento = tarefasConcluidas.filter((e) => e.id !== tarefa.id);
    tarefasConcluidas = existeElemento;
    localStorage.setItem("lista-concluida", JSON.stringify(tarefasConcluidas));

    marcador.addEventListener("click", () => {
      marcarTarefa(tarefa);
    });




  }

};


const editarTarefa = (tarefa) => {

  const tarefaNome = tarefa.querySelector(".tarefaNome").textContent;
  novaTarefaInput.value = tarefaNome;
  btnAdicionarItem.textContent = "Salvar";

  tarefaEditarId = Number(tarefa.id);
  console.log(tarefaEditarId);
};

const salvarEdicao = (tarefa) => {
  const novaTarefa = novaTarefaInput.value;
  if (novaTarefa) {
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
  const tarefaConcluida = tarefasConcluidas.filter((e) => e.id === tarefa.id);
  if (tarefaConcluida.length > 0) {
    const excluir = tarefasConcluidas.filter((e) => e.id !== tarefa.id);
    tarefasConcluidas = excluir;
    localStorage.setItem("lista-concluida", JSON.stringify(tarefasConcluidas));
  }
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

botaoGrandeAtivo.addEventListener("click", (e) => {
  listaDisplay.innerHTML = "";
  listaTarefaMemo = [];
  localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
});

botaoGrandeConcluido.addEventListener("click", (e) => {
  let novaTarefa = listaTarefaMemo;
  tarefasConcluidas.forEach((obj) => {
    novaTarefa = novaTarefa.filter((e) => e.id !== Number(obj.id));
  })
  listaConcluidas.innerHTML = "";
  tarefasConcluidas = [];
  listaTarefaMemo = novaTarefa;
  localStorage.setItem("lista-concluida", JSON.stringify(tarefasConcluidas));
  localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
})


formTarefa.addEventListener("submit", (event) => {
  event.preventDefault();


  let novaTarefa = novaTarefaInput.value;

  const idExiste = listaTarefaMemo.find((e) => e.id === tarefaEditarId);

  if (novaTarefa && !idExiste) {
    let tarefa = {
      nome: novaTarefa,
      id: (listaTarefaMemo.length + 1)
    };
    criarLista(tarefa);
    listaTarefaMemo.push(tarefa);
    localStorage.setItem("lista", JSON.stringify(listaTarefaMemo));
    novaTarefaInput.value = "";
  } else {
    const trocarValor = listaTarefaMemo.map((e) => {
      if (e.id === tarefaEditarId) return { nome: novaTarefa, id: e.id };
      return e;
    });
    const alterarDom = document.getElementById(`${tarefaEditarId}`);
    alterarDom.querySelector(".tarefaNome").textContent = novaTarefa;
    listaTarefaMemo = trocarValor;
    localStorage.setItem("lista", JSON.stringify(trocarValor));
    novaTarefaInput.value = "";
    tarefaEditarId = 0;
    btnAdicionarItem.textContent = "Adicionar";
  }
});

window.addEventListener("load", () => {
  listaTarefaMemo.forEach((tarefa) => {
    criarLista(tarefa);
  });

  tarefasConcluidas.forEach((tarefa) => {
    let tarefaElemento = document.getElementById(tarefa.id);
    marcarTarefa(tarefaElemento);
  });
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