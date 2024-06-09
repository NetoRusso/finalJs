



const exercicioSecao = document.getElementById("exercicio");
const painelLista = document.querySelector(".painelLista");

window.addEventListener("scroll", () => {
  const posicaoExercicio = exercicioSecao.getBoundingClientRect().top;

  if (posicaoExercicio <= 400 && window.innerWidth >= 800) {
    painelLista.style.position = "fixed";
    painelLista.style.top = "128px";
    painelLista.style.left = "32px";
    } else {
      painelLista.style.position = "unset";
  }
})