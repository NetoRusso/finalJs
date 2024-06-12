console.log("Exercicio 02 Foi!");

const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".painelLista");
const formulario = document.getElementById("formularioAqui");
const campoSelection = document.getElementById("campoFormulario");
const inputOpcaoTexto = document.getElementById("opcoes");
const tituloFormulario = document.getElementById("tituloFormulario");
const btnAdicionarItem = document.getElementById("formTarefa");

id = 1;

btnAdicionarItem.addEventListener("submit", (e) => {
  e.preventDefault() 
  let gruposDeValores = {
    tipo: e.target[0].value,
    titulo: e.target[2].value,
    cor: e.target[3].value,
  }

  if (e.target[1].value !== "") {
    gruposDeValores['opcao'] = (e.target[1].value).split(';');
  }

  formulario.innerHTML += criarElementoHTML(gruposDeValores.tipo, gruposDeValores.opcao, gruposDeValores.titulo, gruposDeValores.cor ,id);

  ++id;
})

const criarElementoHTML = (valor, opcoes, titulo, cor, id) => {
  switch (valor) {
    case "text":
      return `
      <input type="text" class="painelInput" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" id="${id}" style="border-color: ${cor};box-shadow: -5px 5px 0 0 ${cor};">
      `;
      break;

    case "email":
      return `
      <input type="email" class="painelInput" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" id="${id}" style="border-color: ${cor};box-shadow: -5px 5px 0 0 ${cor};">
      `;
      break;

    case "password":
      return `
      <input type="password" class="painelInput" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" id="${id}" style="border-color: ${cor};box-shadow: -5px 5px 0 0 ${cor};">
      `;
      break;

    case "number":
      return `
      <input type="number" class="painelInput" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" id="${id}" style="border-color: ${cor};box-shadow: -5px 5px 0 0 ${cor};">
      `;
      break;

    case "select":
      let html = `
        <select class="painelInput" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" id="${id}" style="border-color: ${cor};box-shadow: -5px 5px 0 0 ${cor};"> 
      `;

      opcoes.forEach((op) => {
        html += `<option value="${(op.replace(/\s/g, '')).toLowerCase()}">${op}</option>`
      })

      html += `</select>`;

      return html;
      break;
    case "button":
      return `<button type="submit" class="painelBtn"  id="${id}">${titulo}</button>`
      break;
  }
}


campoSelection.addEventListener("change", (e) => {
  if (e.target.value === "select") {
    inputOpcaoTexto.disabled = false;
  } else {
    inputOpcaoTexto.disabled = true;
    inputOpcaoTexto.value = "";
  }
});

inputOpcaoTexto.addEventListener("focus", () => {
  tituloFormulario.innerText = "Insira os valores das opcoes separadas por ';'";
})

inputOpcaoTexto.addEventListener("blur", () => {
  tituloFormulario.innerText = "Novo campo para o seu formulário";
})

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
