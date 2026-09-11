const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

menuItems.forEach(item => {
  item.addEventListener('click', () => {

    // Atualiza menu ativo
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Atualiza título e subtítulo da página
    pageTitle.textContent = item.textContent.trim();
    if(item.textContent.trim() === "Favoritos") {
      pageSubtitle.textContent = "Veja suas raças favoritas aqui.";
    }else{
      pageSubtitle.textContent = "Explore raças, veja detalhes e marque seus favoritos.";
    }

    // Troca de página
    const pageToShow = item.getAttribute('data-page');
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === pageToShow) {
        page.classList.add('active');
      }
    });
  });
});
