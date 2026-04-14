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