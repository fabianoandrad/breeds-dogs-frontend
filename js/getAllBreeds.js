// ao iniciarmos a pagina pega do navegador (localstorage) os IDs das raças já marcadas como favoritas
const storedFavoriteBreedIds = localStorage.getItem('favoriteBreedIds');
const favoriteBreedIds = storedFavoriteBreedIds ? JSON.parse(storedFavoriteBreedIds) : [];

// Seleciona o container onde os cards serão inseridos
const container = document.getElementById("cards-container");

// Seleciona o card modelo (será clonado para cada raça)
const card = document.getElementById("card");

// // Obtem tag H3 do html título dentro do card modelo
const cardTitle = document.getElementById("card-title");

// Obtem tag img do html
const dogImg = document.getElementById("dog-img");

// Obtem tag label do html
const origin = document.getElementById("origin");
const createdFor = document.getElementById("created-for");
const temperament = document.getElementById("temperament");
const estimatedLifespan = document.getElementById("estimated-lifespan");

// Mantém o card como modelo, mas evita exibi-lo junto com os cards gerados (isso aconetce pq estamos usando o cloneNode)
card.remove();

// Faz uma requisição para a API local que retorna as raças de cães
fetch("http://localhost:8000/api/dogs")
  .then((res) => res.json()) // Converte a resposta para JSON
  .then((data) => {
    // Percorre cada raça retornada pela API
    data.forEach((breed) => {
      //console.log(breed)
      // Atribuimos os valores de cada objeto do json nos cards modelos como nome da raça, imagem, origen...
      // IMPORTANTE: isso altera o card original antes de clonar
      cardTitle.textContent = breed.name;
      dogImg.src = breed.image.url;
      dogImg.alt = breed.name;
      origin.textContent = breed.origin;
      createdFor.textContent = breed.bred_for;
      temperament.textContent = breed.temperament;
      estimatedLifespan.textContent = breed.life_span;

      // Clona o card inteiro (true = clona também os elementos internos)
      const newCard = card.cloneNode(true);

      // O listener deve ser adicionado ao botão clonado, pois cloneNode não copia eventos.
      const favoriteButton = newCard.querySelector(".favorite-button");
      favoriteButton.classList.toggle(
        "is-favorite",
        favoriteBreedIds.includes(breed.id)
      );

      favoriteButton.addEventListener("click", () => {
        if (!favoriteBreedIds.includes(breed.id)) {
          favoriteButton.classList.add("is-favorite");
          favoriteBreedIds.push(breed.id);
        } else {
          favoriteButton.classList.remove("is-favorite");
          const favoriteIndex = favoriteBreedIds.indexOf(breed.id);
          favoriteBreedIds.splice(favoriteIndex, 1);
        }

        localStorage.setItem('favoriteBreedIds', JSON.stringify(favoriteBreedIds));

        console.log("IDs favoritos:", favoriteBreedIds);
      });

      // Adiciona o card clonado ao container
      container.appendChild(newCard);
    });
  });
