// CAPTURANDO OS ELEMENTOS DO HTML (DOM)
// querySelector: Busca o botão pelo nome da classe (precisa do ponto '.')
const btnMobile = document.querySelector('.btn-mobile');

// getElementById: Busca a "gaveta" do menu pelo seu ID (não usa a hashtag '#')
const menuMobile = document.getElementById('menu-mobile');


// ESCUTANDO A AÇÃO DO USUÁRIO
// addEventListener: Fica "ouvindo" o botão. Quando ocorre o evento de 'click',
// ele dispara a função anônima (arrow function: () => {}) logo abaixo.
btnMobile.addEventListener('click', () => {
    
    // 3. O INTERRUPTOR (A MÁGICA)
    // classList.toggle: Age como um interruptor de luz para a classe 'ativo'.
    // - Se o menu NÃO tem a classe 'ativo' -> Ele adiciona (o CSS empurra o menu pra tela).
    // - Se o menu JÁ TEM a classe 'ativo' -> Ele remove (o CSS esconde o menu de novo).
    menuMobile.classList.toggle('ativo');
});

/* ========================================= */
/* CARRINHO LATERAL (SIDE DRAWER)             */
/* ========================================= */

// CAPTURANDO OS ELEMENTOS DO CARRINHO
// Elemento que abre o carrinho (ícone de carrinho de compras)
const abrirCarrinhoBtn = document.querySelector('a[aria-label="Ver carrinho de compras"]');

// Elementos do carrinho
const carrinhoLateral = document.getElementById('carrinho-lateral');
const overlayCarrinho = document.getElementById('overlay-carrinho');
const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');

// FUNÇÃO AUXILIAR: Abrir Carrinho
// Adiciona a classe 'ativo' ao carrinho e ao overlay para que apareçam na tela
function abrirCarrinho() {
    carrinhoLateral.classList.add('ativo');
    overlayCarrinho.classList.add('ativo');
    // Previne que o scroll da página rol enquanto o carrinho está aberto
    document.body.style.overflow = 'hidden';
}

// FUNÇÃO AUXILIAR: Fechar Carrinho
// Remove a classe 'ativo' do carrinho e do overlay para ocultá-los
function fecharCarrinho() {
    carrinhoLateral.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
    // Permite scroll novamente
    document.body.style.overflow = 'auto';
}

// ESCUTANDO CLIQUES PARA ABRIR O CARRINHO
// Quando clica no botão de carrinho, abre o side drawer
abrirCarrinhoBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita comportamento padrão do link
    abrirCarrinho();
});

// ESCUTANDO CLIQUE NO BOTÃO FECHAR
// Quando clica no botão 'X', fecha o carrinho
fecharCarrinhoBtn.addEventListener('click', () => {
    fecharCarrinho();
});

// ESCUTANDO CLIQUE NO OVERLAY
// Quando clica na área escura (fundo), também fecha o carrinho
overlayCarrinho.addEventListener('click', () => {
    fecharCarrinho();
});