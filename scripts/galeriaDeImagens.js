console.log("Exercício 03 Foi!");

const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".painelLista");
const formulario = document.querySelector(".interacaoCard");
const novaImagemInput = document.getElementById("novaImagemInput");
const painelAviso = document.querySelector(".painelAviso");
const segundaLinhaGrade = document.querySelector(".segundaLinhaGrade");
const modalImagem = document.getElementById("modalImagem");
let imagens = document.querySelectorAll(".imagem");

// let todasImagens = [];
console.log(imagens);

novaImagemInput.addEventListener("focus", () => {
  painelAviso.style.display = "block";
  painelAviso.textContent = 'Adicione uma url finalizado em ".jpg" ou ".png"';
});
novaImagemInput.addEventListener("blur", () => {
  painelAviso.style.display = "none";
});


const criarImagem = (url) => {
  let imagem = url;
  let novaImagem = `
    <img class="imagem" src="${imagem}" alt="Imagem">
  `;
  segundaLinhaGrade.insertAdjacentHTML("beforeend", novaImagem);
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let novaImagem = novaImagemInput.value;

  if (novaImagem.endsWith(".jpg") || novaImagem.endsWith(".png")) {
    criarImagem(novaImagem);
    imagens = document.querySelectorAll(".imagem");
    console.log("imagens", imagens);
    formulario.reset();
  } else {
    painelAviso.style.display = "block";
    painelAviso.textContent = "Por favor adicione uma url finalizado em .jpg ou .png";
    formulario.reset();
    return;
  }

  imagens.forEach((imagem) => {
    imagem.addEventListener("click", () => {
      let imagemAmpliada = (imagem.src);
      // console.log(imagemAmpliada);
  
      modalImagem.style.display = "flex";
      modalImagem.addEventListener("click", () => {
        modalImagem.style.display = "none";
      });
  
      modalImagem.querySelector(".modalImagemImg").src = imagemAmpliada;
  
      modalImagem.querySelector(".modalImagemBtn").addEventListener("click", () => {
        modalImagem.style.display = "none";
      });
  
  
  
    });
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