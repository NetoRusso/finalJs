console.log("Exercício 03 Foi!");

const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".painelLista");
const formulario = document.querySelector(".interacaoCard");
const novaImagemInput = document.getElementById("novaImagemInput");
const painelAviso = document.querySelector(".painelAviso");
const segundaLinhaGrade = document.querySelector(".segundaLinhaGrade");
const modalImagem = document.getElementById("modalImagem");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnPrevModal = document.getElementById("btnPrevModal");
const btnNextModal = document.getElementById("btnNextModal");
const modalImagemImg = document.getElementById("modalImagemImg");
let imagens = document.querySelectorAll(".imagem");

let id = 0;

imagens.forEach((imagem) => {
  imagem.addEventListener("click", () => {
    id = Number(imagem.id)
    let atual = imagem.src;
    
    modalImagem.style.display = "flex";
    modalImagemImg.src = atual;

    btnNextModal.addEventListener("click", () => {
      novaImage(id, "proximo");
    });

    btnPrevModal.addEventListener("click", () => {
      novaImage(id, "anterior");
    })

    btnFecharModal.addEventListener("click", () => {
      modalImagem.style.display = "none";
    });
  })
});

const novaImage = (idIndex, type) => {

  let idProximo = idIndex + 1; 4
  let idAnterior = idIndex - 1; 2

  if (idProximo > imagens.length) {
    idProximo = 1;
  }

  if (idAnterior < 1 ) {
    idAnterior = imagens.length;
  }
  
  if ( type === "proximo") { 
    modalImagemImg.src = imagens[idProximo - 1].src;
    id = idProximo; 
  } 
  
  if ( type === "anterior") {
    modalImagemImg.src = imagens[idAnterior - 1].src;
    id = idAnterior;
  }
}



novaImagemInput.addEventListener("focus", () => {
  painelAviso.style.display = "block";
  painelAviso.textContent = 'Adicione uma url finalizado em ".jpg" ou ".png"';
});
novaImagemInput.addEventListener("blur", () => {
  painelAviso.style.display = "none";
});

const criarImagem = (url, contador) => {
  let imagem = url;
  let novaImagem = `
    <img id="${contador}" class="imagem" src="${imagem}" alt="Imagem">
  `;
  segundaLinhaGrade.insertAdjacentHTML("beforeend", novaImagem);
};

let contador = 6;

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let novaImagem = novaImagemInput.value;

  if (novaImagem.endsWith(".jpg") || novaImagem.endsWith(".png")) {
    criarImagem(novaImagem, contador);
    imagens = document.querySelectorAll(".imagem");
    console.log("imagens", imagens);
    contador++;
    formulario.reset();
  } else {
    painelAviso.style.display = "block";
    painelAviso.textContent = "Por favor adicione uma url finalizado em .jpg ou .png";
    formulario.reset();
    return;
  }

  imagens.forEach((imagem) => {
    imagem.addEventListener("click", () => {
      id = Number(imagem.id)
      let atual = imagem.src;
      
      modalImagem.style.display = "flex";
      modalImagemImg.src = atual;
  
      btnNextModal.addEventListener("click", () => {
        novaImage(id, "proximo");
      });
  
      btnPrevModal.addEventListener("click", () => {
        novaImage(id, "anterior");
      })
  
      btnFecharModal.addEventListener("click", () => {
        modalImagem.style.display = "none";
      });
    })
  });

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
