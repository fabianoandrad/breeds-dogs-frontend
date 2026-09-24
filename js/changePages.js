// Seleciona todos os itens do menu lateral
const menuItems = document.querySelectorAll('.menu-item');

// Seleciona todas as páginas (sections) que serão alternadas
const pages = document.querySelectorAll('.page');

// Seleciona os elementos que exibem título e subtítulo da página
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

// Para cada item do menu, adiciona um evento de clique
menuItems.forEach(item => {
  item.addEventListener('click', () => {

    // ===== Atualiza o item ativo no menu =====
    // Remove a classe "active" de todos os itens
    menuItems.forEach(i => i.classList.remove('active'));

    // Adiciona a classe "active" ao item clicado
    item.classList.add('active');

    // ===== Atualiza título e subtítulo da página =====
    // Define o título como o texto do item clicado
    pageTitle.textContent = item.textContent.trim();

    // Ajusta o subtítulo dependendo da página selecionada
    if (item.textContent.trim() === "Favoritos") {
      pageSubtitle.textContent = "Veja suas raças favoritas aqui.";
    } else {
      pageSubtitle.textContent = "Explore raças, veja detalhes e marque seus favoritos.";
    }

    // ===== Troca de página =====
    // Obtém o nome da página que deve ser exibida (via data-page)
    const pageToShow = item.getAttribute('data-page');

    // Percorre todas as páginas e ativa apenas a correspondente
    pages.forEach(page => {
      page.classList.remove('active'); // Oculta todas
      if (page.id === pageToShow) {
        page.classList.add('active'); // Exibe a página correta
      }
    });
  });
});
