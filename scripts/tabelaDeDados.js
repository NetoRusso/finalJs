console.log("Exercicio 04 OK");


const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".painelLista");
const aniversarioTabela = document.getElementById("corpoTabelaAniversarios");
const novoAniversario = document.getElementById("formTarefa");
const buscaTabelaAniversarios = document.getElementById("buscaTabelaAniversarios");
const ordemAniversario = document.getElementById("ordemAniversario");
const ordemNome = document.getElementById("ordemNome");

const aniversarios = [
  {
    data: "02/06",
    nome: "Milena Chrysostomo Leme"
  },
  {
    data: "31/01",
    nome: "Lucia Helena Rocha Bucchianeri"
  },
  {
    data: "07/07",
    nome: "Anajara Machado Lucas"
  },
  {
    data: "07/06",
    nome: "Douglas Okami Ferreira"
  },
  {
    data: "13/10",
    nome: "Neto Russo"
  },
  {
    data: "13/07",
    nome: "Romulo Nougueira de Souza"
  },
  {
    data: "22/03",
    nome: "Keity Martin de Souza"
  },
];

novoAniversario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e)
  const dataInput = e.target[0].value;
  const novoNome = e.target[1].value;

  let niver = dataInput.split("-");
  let dia = niver[2];
  let mes = niver[1];
  let dataAniversario = `${dia}/${mes}`;

  const aniversario = {
    data: dataAniversario,
    nome: novoNome
  };

  const html = elementoNovo(aniversario);
  aniversarioTabela.innerHTML += html;

  aniversarios.push(aniversario);
  novoAniversario.reset();
});

const elementoNovo = (aniver) => {
  return `
    <tr>
      <td colspan="1">
        ${aniver.data}
      </td>
      <td colspan="9">
        ${aniver.nome}
      </td>
    </tr>
  `
};

aniversarios.forEach(elemento => {
  const html = elementoNovo(elemento);
  aniversarioTabela.innerHTML += html;
})

buscaTabelaAniversarios.addEventListener("input", (e) => {
  let buscado = e.target.value;
  console.log(buscado);
  aniversarioTabela.innerHTML = "";

  let filtro = aniversarios.filter(aniver => {
    return aniver.nome.toLowerCase().includes(buscado.toLowerCase());
  });

  filtro.forEach(elemento => {
    const html = elementoNovo(elemento);
    aniversarioTabela.innerHTML += html;
  });
});


function parseDateDDMM(dateString) {
  const [day, month] = dateString.split('/');
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day);
}

function compareDatesDDMM(a, b) {
  const dateA = parseDateDDMM(a);
  const dateB = parseDateDDMM(b);
  return dateA - dateB;
}

let ordem = "cres";
ordemAniversario.addEventListener("click", (e) => {


  let sort = [];

  aniversarioTabela.innerHTML = "";

  switch (ordem) {
    case "cres":
      ordem = "decres";
      sort = aniversarios.sort((a, b) => compareDatesDDMM(a.data, b.data));
      return sort.forEach(elemento => {
        const html = elementoNovo(elemento);
        aniversarioTabela.innerHTML += html;
      });
      break;

    case "decres":
      ordem = "cres";
      sort = aniversarios.sort((a, b) => compareDatesDDMM(b.data, a.data));
      return sort.forEach(elemento => {
        const html = elementoNovo(elemento);
        aniversarioTabela.innerHTML += html;
      });
      break;
  }

  console.log(sort);

});

let alfa = "AZ"

ordemNome.addEventListener("click", (e) => {
  let sort = [];

  aniversarioTabela.innerHTML = "";

  switch (alfa) {
    case "AZ":
      alfa = "ZA";
      sort = aniversarios.sort((a, b) => { return a.nome > b.nome ? -1 : 1; });
      return sort.forEach(elemento => {
        const html = elementoNovo(elemento);
        aniversarioTabela.innerHTML += html;
      });
      break;

    case "ZA":
      alfa = "AZ";
      sort = aniversarios.sort((a, b) => { return a.nome > b.nome ? 1 : -1; });
      return sort.forEach(elemento => {
        const html = elementoNovo(elemento);
        aniversarioTabela.innerHTML += html;
      });
      break;
  }

  console.log(sort);
});

buscaTabelaAniversarios.addEventListener("blur", (e) => {
  e.target.value = "";
  aniversarioTabela.innerHTML = "";
  aniversarios.forEach(elemento => {
    const html = elementoNovo(elemento);
    aniversarioTabela.innerHTML += html;
  })
});






window.addEventListener("scroll", () => {
  const posicaoExercicio = exercicioSecao.getBoundingClientRect().top;

  if (posicaoExercicio <= 400 && window.innerWidth >= 800) {
    painelLista.style.position = "fixed";
    painelLista.style.top = "176px";
    painelLista.style.left = "32px";
    exercicioConteudo.style.justifyContent = "flex-end";
  } else {
    painelLista.style.position = "unset";
    exercicioConteudo.style.justifyContent = "center";
  }
});
