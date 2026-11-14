// Seleciona o container e o card modelo dos favoritos
const favoriteContainer = document.getElementById("favorite-cards-container");
const favoriteCard = favoriteContainer.querySelector(".favorite-card");

// Guarda referências aos campos do modelo para preenchê-los com os dados de cada raça
const favoriteImage = document.getElementById("favorite-dog-img");
const favoriteTitle = document.getElementById("card-title");
const favoriteOrigin = document.getElementById("origin");
const favoriteCreatedFor = document.getElementById("created-for");
const favoriteTemperament = document.getElementById("temperament");
const favoriteLifespan = document.getElementById("estimated-lifespan");

// Retira o modelo da tela; a variável favoriteCard continua disponível para cloneNode()
favoriteCard.remove();

async function loadFavoriteBreeds() {
  // Limpa os cards anteriores para não duplicá-los ao abrir a página novamente
  favoriteContainer.replaceChildren();

  // localStorage só armazena texto; JSON.parse converte a lista salva de volta em array
  const storedFavoriteBreedIds = localStorage.getItem("favoriteBreedIds");
  const favoriteBreedIds = storedFavoriteBreedIds ? JSON.parse(storedFavoriteBreedIds) : [];

  // Faz uma requisição por ID; allSettled permite processar resultados mesmo
  // quando alguma raça falha, sem cancelar as outras requisições
  const results = await Promise.allSettled(
    favoriteBreedIds.map((id) =>
      fetch(`http://localhost:8000/api/dog/${encodeURIComponent(id)}`).then(
        (response) => {
          return response.json();
        }
      )
    )
  );

  // Percorre as respostas na mesma ordem dos IDs salvos
  results.forEach((result, index) => {

    const breed = result.value;
    // Preenche o modelo com os dados recebidos antes de criar a cópia
    favoriteImage.src = breed.image.url;
    favoriteImage.alt = breed.name;
    favoriteTitle.textContent = breed.name || "Não informado";
    favoriteOrigin.textContent = breed.origin || "Não informado";
    favoriteCreatedFor.textContent = breed.bred_for || "Não informado";
    favoriteTemperament.textContent = breed.temperament || "Não informado";
    favoriteLifespan.textContent = breed.life_span || "Não informado";

    // Clona o modelo preenchido; os listeners não são copiados, então o botão
    // de cada novo card recebe seu próprio evento abaixo
    const newCard = favoriteCard.cloneNode(true);
    const favoriteButton = newCard.querySelector(".favorite-button");

    favoriteButton.addEventListener("click", () => {
      // Lê novamente a lista para trabalhar com o valor mais recente do localStorage
      const currentFavoriteIds = JSON.parse(localStorage.getItem("favoriteBreedIds") || "[]" );

      // Remove o ID, salva a lista atualizada e tira este card da tela
      const favoriteIndex = favoriteBreedIds.indexOf(breed.id);
      currentFavoriteIds.splice(favoriteIndex, 1);
      localStorage.setItem("favoriteBreedIds", JSON.stringify(currentFavoriteIds));
      newCard.remove();
    });

    // Insere o card pronto na página
    favoriteContainer.appendChild(newCard);
  });

}

// Ao clicar em Favoritos, busca novamente os IDs e atualiza os cards exibidos
document
  .querySelector('.menu-item[data-page="favorite"]')
  .addEventListener("click", () => {
    loadFavoriteBreeds();
  });

// Também carrega os favoritos ao abrir/recarregar a página inicialmente
loadFavoriteBreeds();
