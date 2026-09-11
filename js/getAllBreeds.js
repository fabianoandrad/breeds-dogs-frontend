const container = document.getElementById('cards-container');
const card = document.getElementById('card');
const cardTitle = document.getElementById('card-title');

fetch("http://localhost:8000/api/dogs")
    .then(res => res.json())
    .then(data => {
        data.forEach(breed => {
            //card.textContent = breed.name;
            cardTitle.textContent = breed.name;
            container.appendChild(card.cloneNode(true));
        });
    });