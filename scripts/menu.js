const abrir = document.getElementById("menuConteudoMobile");
const fechar = document.getElementById("btnFecharModalMenu");
const fundo = document.getElementById("fundoModal");
const conteudo = document.getElementById("menuMobileConteudo");
const modal = document.getElementById("modal");
let estadoDoModal = false;

function abrirEFechar() {
  if (estadoDoModal) {

    conteudo.classList.remove("aberto");
    conteudo.classList.add("fechado");
    setTimeout(() => {
      modal.style = "display: none;";
      estadoDoModal = false;
    }, 500)


  } else {
    modal.style = "display: fixed;";
    conteudo.classList.remove("fechado");
    conteudo.classList.add("aberto");
    estadoDoModal = true;
  }
}

abrir.addEventListener("click", (e) => {
  e.preventDefault();
  abrirEFechar()
});

fechar.addEventListener("click", (e) => {
  e.preventDefault();
  abrirEFechar()
});
