// URL base da sua API PHP
const API_BASE = "http://localhost:8000/api/dog";

// Elementos da página
const btnLoadAll = document.getElementById("loadAll");
const btnLoadById = document.getElementById("loadById");
const resultDiv = document.getElementById("result");

// ---------------------------------------------
// Função para exibir dados na tela
// ---------------------------------------------
function showResult(data) {
    resultDiv.innerHTML = `
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
}

// ---------------------------------------------
// Buscar TODAS as raças
// ---------------------------------------------
btnLoadAll.addEventListener("click", async () => {
    try {
        const response = await fetch(API_BASE);
        const data = await response.json();
        showResult(data);
    } catch (error) {
        showResult({ error: "Erro ao carregar lista de raças" });
    }
});

// ---------------------------------------------
// Buscar uma raça pelo ID
// ---------------------------------------------
btnLoadById.addEventListener("click", async () => {
    const id = document.getElementById("dogId").value;

    if (!id) {
        showResult({ error: "Digite um ID válido" });
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/${id}`);
        const data = await response.json();
        showResult(data);
    } catch (error) {
        showResult({ error: "Erro ao buscar raça pelo ID" });
    }
});
