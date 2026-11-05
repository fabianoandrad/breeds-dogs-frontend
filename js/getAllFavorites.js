// Seleciona o container e o card modelo dos favoritos
const favoriteContainer = document.getElementById("favorite-cards-container");
const favoriteCard = favoriteContainer.querySelector(".favorite-card");

// Guarda referências aos campos do modelo para preenchê-los com os dados de cada raça
const favoriteImage = favoriteCard.querySelector(".favorite-dog-img");
const favoriteTitle = favoriteCard.querySelector(".card-title");
const favoriteOrigin = favoriteCard.querySelector(".origin");
const favoriteCreatedFor = favoriteCard.querySelector(".created-for");
const favoriteTemperament = favoriteCard.querySelector(".temperament");
const favoriteLifespan = favoriteCard.querySelector(".estimated-lifespan");

// Retira o modelo da tela; a variável favoriteCard continua disponível para cloneNode()
favoriteCard.remove();

// function showEmptyMessage(message) {
//   const messageElement = document.createElement("p");
//   messageElement.textContent = message;
//   // Substitui o conteúdo atual do container pela mensagem informativa
//   favoriteContainer.replaceChildren(messageElement);
// }

async function loadFavoriteBreeds() {
  // Limpa os cards anteriores para não duplicá-los ao abrir a página novamente
  favoriteContainer.replaceChildren();

  // localStorage só armazena texto; JSON.parse converte a lista salva de volta em array
  const storedFavoriteBreedIds = localStorage.getItem("favoriteBreedIds");
  const favoriteBreedIds = storedFavoriteBreedIds ? JSON.parse(storedFavoriteBreedIds) : [];

//   if (!Array.isArray(favoriteBreedIds)) {
//     throw new TypeError("A lista de favoritos salva no localStorage não é válida.");
//   }

    //   // Se ainda não houver IDs salvos, não há raças para consultar
    //   if (favoriteBreedIds.length === 0) {
    //     showEmptyMessage("Você ainda não adicionou raças aos favoritos.");
    //     return;
    //   }

  // Faz uma requisição por ID; allSettled permite processar resultados mesmo
  // quando alguma raça falha, sem cancelar as outras requisições
  const results = await Promise.allSettled(
    favoriteBreedIds.map((id) =>
      fetch(`http://localhost:8000/api/dog/${encodeURIComponent(id)}`).then(
        (response) => {
          // fetch só rejeita automaticamente em erro de rede; valida também erros HTTP
        //   if (!response.ok) {
        //     throw new Error(`A API retornou o status ${response.status}.`);
        //   }

          return response.json();
        }
      )
    )
  );

  // Percorre as respostas na mesma ordem dos IDs salvos
  results.forEach((result, index) => {
    // Registra falhas individuais e continua exibindo as demais raças
    // if (result.status === "rejected" || result.value.error) {
    //   console.error(`Não foi possível carregar a raça favorita de ID ${favoriteBreedIds[index]}:`, result.status === "rejected" ? result.reason : result.value.error
    //   );
    //   return;
    // }

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
    // favoriteButton.setAttribute(
    //   "aria-label",
    //   `Remover ${breed.name} dos favoritos`
    // );

    favoriteButton.addEventListener("click", () => {
      // Lê novamente a lista para trabalhar com o valor mais recente do localStorage
      const currentFavoriteIds = JSON.parse(localStorage.getItem("favoriteBreedIds") || "[]" );
      // Compara como texto para funcionar tanto se o ID estiver salvo como número ou string
    //   const favoriteIndex = currentFavoriteIds.findIndex(
    //     (id) => String(id) === String(breed.id)
    //   );

      //if (favoriteIndex === -1) return;

      // Remove o ID, salva a lista atualizada e tira este card da tela
      currentFavoriteIds.splice(favoriteIndex, 1);
      localStorage.setItem(
        "favoriteBreedIds",
        JSON.stringify(currentFavoriteIds)
      );
      newCard.remove();

      // Exibe uma mensagem quando o último favorito é removido
    //   if (favoriteContainer.childElementCount === 0) {
    //     showEmptyMessage("Você ainda não adicionou raças aos favoritos.");
    //   }
    });

    // Insere o card pronto na página
    favoriteContainer.appendChild(newCard);
  });

  // Se todas as requisições falharam, informa que nenhum favorito pôde ser carregado
//   if (favoriteContainer.childElementCount === 0) {
//     showEmptyMessage("Não foi possível carregar os favoritos. Verifique a API.");
//   }
}

// function handleLoadError(error) {
//   console.error("Erro ao carregar as raças favoritas:", error);
//   showEmptyMessage("Não foi possível carregar os favoritos. Verifique a API.");
// }

// Ao clicar em Favoritos, busca novamente os IDs e atualiza os cards exibidos
document
  .querySelector('.menu-item[data-page="favorite"]')
  .addEventListener("click", () => {
    loadFavoriteBreeds().catch(handleLoadError);
  });

// Também carrega os favoritos ao abrir/recarregar a página inicialmente
loadFavoriteBreeds();
