console.log("Exercício 02 Foi!");

const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".painelLista");
const formulario = document.getElementById("formularioAqui");
const campoSelection = document.getElementById("campoFormulario");
const inputOpcaoTexto = document.getElementById("opcoes");
const tituloFormulario = document.getElementById("tituloFormulario");
const formAdicionarItem = document.getElementById("formTarefa");
const copiarCodigoBtn = document.getElementById("codigoBtn");
const codigoMensagem = document.getElementById("codigoMensagem");

let id = 1;

formAdicionarItem.addEventListener("submit", (e) => {
  
  e.preventDefault()
  let gruposDeValores = {
    tipo: e.target[0].value,
    titulo: e.target[2].value,
    cor: e.target[3].value,
  }

  if (e.target[1].value !== "") {
    gruposDeValores['opcao'] = (e.target[1].value).split(';');
  }

  formulario.innerHTML += criarElementoHTML(gruposDeValores.tipo, gruposDeValores.opcao, gruposDeValores.titulo, gruposDeValores.cor, id);

  let btn = document.querySelectorAll(`.excluirItem`);

  btn.forEach((btnEl) => {
    btnEl.addEventListener("click", (e) => {
      excluir(e)
    })
  })


  copiarCodigoBtn.style.display = "block";

  formAdicionarItem.reset();
  inputOpcaoTexto.disabled = true;
  ++id;
});

const excluir = (e) => {
  const idElemento = (e.target.id).split('-')[1];
  const elemento = document.getElementById(idElemento)
  elemento.remove();
  let btn = document.querySelectorAll(`.excluirItem`);

  if (btn.length === 0) {
    copiarCodigoBtn.style.display = "none";
  }
}

const criarElementoHTML = (valor, opcoes, titulo, cor, id) => {
  switch (valor) {
    case "text":
      return `
      <div id="${id}" style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

      <button class="excluirItem" type="button" id="btn-${id}" style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">
        
      </button>

      <input class="inputCriado" type="text" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" style="     
        width: 60%;
        min-width: 280px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
        border: 5px solid ${cor};
        box-shadow: -5px 5px 0 0 ${cor};
      ">
      </div>
      `;
      break;

    case "email":
      return `
      <div id="${id}"style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

    <button class="excluirItem" type="button" id="btn-${id}"style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">
    
    </button>
      <input class="inputCriado" type="email" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" style="     
        width: 60%;
        min-width: 280px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
        border: 5px solid ${cor};
        box-shadow: -5px 5px 0 0 ${cor};
      ">
      </div>
      `;
      break;

    case "password":
      return `
      <div id="${id}" style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

      <button class="excluirItem" type="button" id="btn-${id}" style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">
        
      </button>
      <input class="inputCriado" type="password" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" style="     
        width: 60%;
        min-width: 280px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
        border: 5px solid ${cor};
        box-shadow: -5px 5px 0 0 ${cor};
      ">
      </div>
      `;
      break;

    case "number":
      return `
      <div id="${id}"style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

      <button class="excluirItem" type="button" id="btn-${id}" style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">
        
      </button>
      <input class="inputCriado" type="number" placeholder="${titulo}" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" style="     
        width: 60%;
        min-width: 280px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
        border: 5px solid ${cor};
        box-shadow: -5px 5px 0 0 ${cor};
      ">
      </div>
      `;
      break;

    case "select":
      let html = `
      <div id="${id}" style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

      <button class="excluirItem" type="button" id="btn-${id}" style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">

      </button>
        <select class="inputCriado" name="${(titulo.replace(/\s/g, '')).toLowerCase()}" style="     
        width: 60%;
        min-width: 280px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
        border: 5px solid ${cor};
        box-shadow: -5px 5px 0 0 ${cor};
      ">
        <option value=default>${titulo}</option> 
      `;

      opcoes.forEach((op) => {
        if (op !== "") {
          html += `<option value="${(op.replace(/\s/g, '')).toLowerCase()}">${op}</option>`
        }
      })

      html += `</select></div>`;

      return html;
      break;
    case "button":
      return `
      <div id="${id}"style="
        width: 100%; 
        display: flex; 
        align-items: center;
        justify-content: right;
        gap: 3%;
        margin-left: 10px;
      ">

      <button class="excluirItem" type="button" id="btn-${id}" style ="
        width: auto;
        heigth: auto; 
        aspect-ratio: 1; 
        padding: 16px;
        background-image: url('../assets/img/excluirIcon.png'); 
        background-position: center;
        background-repeat: no-repeat; 
        background-size: contain; 
        border-radius: 50px; 
        border: none; 
        cursor: pointer;
      ">
      </button>
      <button class="inputCriado" type="submit"  
      style="
        cursor: pointer;
        width: auto;
        min-width: 100px;
        padding: 5px 10px;
        border: 3px solid ${cor};
        border-radius: 10px;
        background-color: var(--cor-claro-1);
        box-shadow: -3px 3px 0 0 ${cor};
        font-weight: 600;
        color: var(--cor-escuro-1);
        align-self: flex-end; 
      ">
        ${titulo}
        </button>
      </div>
      `
      break;
  }
}

const copiarCodigo = (texto) => {
  if (!navigator.clipboard) {
    alert("Seu navegador não suporta copiar para área de transferência!")
  }

  navigator.clipboard.writeText(texto)
    .then(() => {
      console.log("Texto copiado")
    })
    .catch(err => {
      console.error("Falha ao copiar", err)
    });

  codigoMensagem.style.display = 'block';
  setTimeout(() => {
    codigoMensagem.style.display = 'none';
  }, 3000);
}

copiarCodigoBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let codigo = "";
  let selecao = formulario.querySelectorAll(".inputCriado");
  selecao.forEach((e) => {
    console.log(e);
    codigo += `
    ${e.outerHTML};
    `
  })

  copiarCodigo(codigo);
  // console.log("foi :" + codigo);

})


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
    painelLista.style.top = "176px";
    painelLista.style.left = "32px";
    exercicioConteudo.style.justifyContent = "flex-end";
  } else {
    painelLista.style.position = "unset";
    exercicioConteudo.style.justifyContent = "center";
  }
});
