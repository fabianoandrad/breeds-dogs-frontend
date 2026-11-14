// Seleciona todas os itens do menu lateral 
const menuItems = document.querySelectorAll('.menu-item');

//seleciona os elemntos que exibem título e subtítulo da página.
const pages= document.querySelectorAll('.page');

// Seleciona os elementos que exibem título e subtítulo de página
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

// Para cada item do meu menu lateral, adiciona um evento de clique
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // ====Atuali o item ativo do menu lateral====
    // Remove a classe 'active' de todos os itens do menu lateral
    menuItems.forEach (item => item.classList.remove('active'));
    // Adiona a classe 'active' ao item clicado
    item.classList.add('active');
    //==== Atuliza o titulo do cabeçalho da pagina exibida no momento===
   // ==== Define o titulo como o texto do item clicado
   pageTitle.textContent = item. textContent.trim(); 

   //=== ajusta dependendo da pagina selecionada ===
   if(item.textContent.trim() === "Favoritos") {
    pageSubtitle.textContent = "Veja suas raças favoritas aqui.";

   } else    
    { pageSubtitle.textContent = "Explore raças, veja detalhes e marque seus favoritos."
  }   
 // ==== Troca de pagina ====
 // obtem o nome da pagina que devve ser exibida  ( via datapage)
  const pageToShow = item.getAttribute("data-page");

 //percorre todas as paginas e ativa apenas a correspondente
  pages.forEach (page => {
    page.classList.remove("active");//oculta paginas
    if (page.id === pageToShow) {
      page.classList.add("active");//exibe a pagina correta

    }

  })
  })
})