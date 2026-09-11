// Seleciona o container onde os cards serão inseridos
const container = document.getElementById('cards-container');

// Seleciona o card modelo (será clonado para cada raça)
const card = document.getElementById('card');

// Seleciona o título dentro do card modelo
const cardTitle = document.getElementById('card-title');

// Faz uma requisição para a API local que retorna as raças de cães
fetch("http://localhost:8000/api/dogs")
    .then(res => res.json()) // Converte a resposta para JSON
    .then(data => {

        // Percorre cada raça retornada pela API
        data.forEach(breed => {

            // Atualiza o título do card modelo com o nome da raça
            // IMPORTANTE: isso altera o card original antes de clonar
            cardTitle.textContent = breed.name;

            // Clona o card inteiro (true = clona também os elementos internos)
            const newCard = card.cloneNode(true);

            // Adiciona o card clonado ao container
            container.appendChild(newCard);
        });
    });
