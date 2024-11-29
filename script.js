let filmes = []; // Variável global para armazenar os filmes

// Função para carregar os filmes de um arquivo JSON
async function carregarFilmes() {
  try {
    const response = await fetch("filmes.json"); // Carrega o arquivo JSON
    filmes = await response.json(); // Converte para um array de objetos JavaScript
    renderFilmes(filmes); // Renderiza todos os filmes inicialmente
  } catch (error) {
    console.error("Erro ao carregar o JSON:", error);
  }
}

// Função para renderizar os filmes no HTML
function renderFilmes(listaFilmes) {
  const container = document.getElementById("movies");
  container.innerHTML = ""; // Limpa o conteúdo anterior

  listaFilmes.forEach(filme => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${filme.capa}" alt="${filme.titulo}">
      <h3>${filme.titulo}</h3>
      <p>Gênero: ${filme.genero}</p>
      <div class="rating">${filme.nota}</div>
      <div class="status">Status: ${filme.status}</div>
      <div class="date">Assistido em: ${filme.data}</div>
    `;

    container.appendChild(card);
  });
}

// Função para filtrar os filmes por gênero
function filterGenre(genre) {
  if (genre === "Todos") {
    renderFilmes(filmes); // Mostra todos os filmes
  } else {
    const filtrados = filmes.filter(filme => filme.genero.includes(genre));
    renderFilmes(filtrados); // Mostra apenas os filmes filtrados
  }
}

// Adiciona eventos de clique para os botões de filtro
document.addEventListener("DOMContentLoaded", () => {
  carregarFilmes(); // Carrega os filmes do JSON

  // Adiciona eventos de clique aos botões de filtro
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const genre = button.textContent; // Obtém o texto do botão (gênero)
      filterGenre(genre); // Aplica o filtro
    });
  });
});
