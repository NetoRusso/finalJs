console.log("Exercicio 05 OK");

const exercicioSecao = document.getElementById("exercicio");
const exercicioConteudo = document.querySelector(".exercicioConteudo");
const painelLista = document.querySelector(".carrinhoDisplay");
const botaoCard = document.querySelectorAll(".botaoCard");
const tabelaCarrinhoCorpo = document.getElementById("tabelaCarrinhoCorpo");
const pagarBtn = document.getElementById("pagarBtn");
const valor = document.getElementById('total');

let produtos = [
  {
    id: 1,
    nome: "Notebook ASUS TUF Gaming F15.",
    preco: 7649.16,
    imagem: "https://m.media-amazon.com/images/I/8152wfCdW5L._AC_SL1500_.jpg",
    qtd: 0,
  },
  {
    id: 2,
    nome: "Notebook Gamer Dell G15-i1300-A20P.",
    preco: 5745.50,
    imagem: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/118c37be-e11d-4f92-bc8f-e0c718022dd5.__CR0,0,4042,2500_PT0_SX970_V1___.jpg",
    qtd: 0,
  },
  {
    id: 3,
    nome: "Mochila DELL Gaming",
    preco: 337.00,
    imagem: "https://m.media-amazon.com/images/S/aplus-media/vc/b1c04c1e-f3e3-4487-817f-30e6900560c1.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    qtd: 0,
  },
  {
    id: 4,
    nome: "Dell - teclado e mouse KM3322W",
    preco: 120.00,
    imagem: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f435cf6b-c016-435a-914c-f6ff9460a26e.__CR0,0,2021,1250_PT0_SX970_V1___.jpg",
    qtd: 0,
  },
  {
    id: 5,
    nome: "Suporte De Notebook De Alumínio Ajustável",
    preco: 99.90,
    imagem: "https://m.media-amazon.com/images/I/61ZqTo-kwpL._AC_SL1500_.jpg",
    qtd: 0,
  },
  {
    id: 6,
    nome: "Galaxy Tab S9 FE",
    preco: 2569.90,
    imagem: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a87742e3-f624-4cb8-8e03-f7be799a661b.__CR0,0,970,600_PT0_SX970_V1___.png",
    qtd: 0,
  }
];

function somaTotalDoCarrinho() {
  let soma = 0

  produtos.map(({ qtd, preco }) => {
    if (qtd > 0) {
      soma += (qtd * preco)
    }
  })

  valor.innerText = soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}


function diminuirItemDoCarrinho(numeroId) {
  produtos = produtos.map((produto) => {
    if (numeroId === produto.id) {
      return { ...produto, qtd: (produto.qtd - 1 <= 0 ? 0 : produto.qtd - 1) };
    }
    return { ...produto }
  });

  modificarTabelaInserindoHtml();
  somaTotalDoCarrinho();
}

function somarItemDoCarrinho(numeroId) {
  produtos = produtos.map((produto) => {
    if (numeroId === produto.id) {
      return { ...produto, qtd: produto.qtd + 1 };
    }
    return { ...produto }
  });


  modificarTabelaInserindoHtml();
  somaTotalDoCarrinho();
}

const criarHTMLDoCarrinho = (produto) => {
  return `
    <tr>
      <td colspan="1" class="botoesTabela">
        <div id="botaoDiminuir-${produto.id}" class="botaoTabela botaoDiminuir">-</div>
        <div id="botaoAumentar-${produto.id}" class="botaoTabela botaoAumentar">+</div>
      </td>
      <td colspan="1" class="celulaConteudo">
        ${produto.qtd}
      </td>
      <td colspan="6" class="celulaConteudo">
        ${produto.nome}
      </td>
      <td colspan="1" class="celulaValor">
        ${produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </td>
    </tr>
  `
}

const modificarTabelaInserindoHtml = () => {
  let html = '';

  produtos.forEach((produto) => {
    if (produto.qtd > 0) {
      html += `${criarHTMLDoCarrinho(produto)}`;
    }
  })

  tabelaCarrinhoCorpo.innerHTML = '';
  tabelaCarrinhoCorpo.innerHTML = html;

  const botaoDiminuir = document.querySelectorAll(".botaoDiminuir");
  const botaoAumentar = document.querySelectorAll(".botaoAumentar");

  botaoDiminuir.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = Number(e.target.id.split('-')[1]);
      console.log(id);
      diminuirItemDoCarrinho(id);
    })
  })

  botaoAumentar.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = Number(e.target.id.split('-')[1]);
      somarItemDoCarrinho(id);
    })
  })
}

botaoCard.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    const id = Number(e.target.value);

    const novo = produtos.map((produto) => {
      if (produto.id === id) return { ...produto, qtd: produto.qtd + 1 };
      return { ...produto, qtd: produto.qtd }
    })

    produtos = novo

    modificarTabelaInserindoHtml();
    somaTotalDoCarrinho();
  })
})

pagarBtn.addEventListener("click", () => {
  produtos = produtos.map((produto) => { return { ...produto, qtd: 0 } });

  modificarTabelaInserindoHtml();
  
  valor.innerHTML = `Obrigado pela preferência! <br/> volte sempre!`

  setTimeout(() => {
    somaTotalDoCarrinho();
  }, 10000)
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