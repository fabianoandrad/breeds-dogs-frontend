// Seleciona o container onde os cards serão inseridos
const container = document.getElementById('cards-container');

// Seleciona o card modelo (será clonado para cada raça)
const card = document.getElementById('card');

// // Obtem tag H3 do html título dentro do card modelo
const cardTitle = document.getElementById('card-title');

// Obtem tag img do html
const dogImg = document.getElementById('dog-img');

// Obtem tag label do html
const origin = document.getElementById('origin');
const createdFor = document.getElementById('created-for');
const temperament = document.getElementById('temperament');
const estimatedLifespan = document.getElementById('estimated-lifespan');

// Faz uma requisição para a API local que retorna as raças de cães
fetch("http://localhost:8000/api/dogs")
    .then(res => res.json()) // Converte a resposta para JSON
    .then(data => {

        // Percorre cada raça retornada pela API
        data.forEach(breed => {

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

            // Adiciona o card clonado ao container
            container.appendChild(newCard);
        });
    });
