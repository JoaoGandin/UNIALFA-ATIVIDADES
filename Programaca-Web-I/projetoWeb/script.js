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

/* ========================================= */
/* SISTEMA DE ADICIONAR PRODUTOS AO CARRINHO */
/* ========================================= */

// CAPTURANDO ELEMENTOS NECESSÁRIOS
const carrinhoItensDiv = document.querySelector('.carrinho-itens'); // Container dos itens
const carrinhoTotalValor = document.getElementById('carrinho-total-valor');

// Array para armazenar os produtos do carrinho (para controle interno)
let carrinhoArray = [];

// FUNÇAO: Adicionar Produto ao Carrinho
function adicionarProdutoAoCarrinho(nomeProduto, precoProduto, imagemProduto) {
    // 1. REMOVER MENSAGEM "CARRINHO VAZIO"
    const msgCarrinhoVazio = carrinhoItensDiv.querySelector('.carrinho-vazio');
    if (msgCarrinhoVazio) {
        msgCarrinhoVazio.remove();
    }

    // 2. CRIAR ESTRUTURA HTML DO ITEM NA CARRINHO
    // Essa é uma div com classes CSS para estilo limpo
    const itemCarrinho = document.createElement('div');
    itemCarrinho.className = 'carrinho-item';
    
    // Usamos innerHTML para construir o HTML do item
    itemCarrinho.innerHTML = `
        <div class="carrinho-item-imagem">
            <img src="${imagemProduto}" alt="${nomeProduto}">
        </div>
        <div class="carrinho-item-info">
            <h4>${nomeProduto}</h4>
            <p class="carrinho-item-preco">${precoProduto}</p>
        </div>
        <button class="carrinho-item-remover" aria-label="Remover ${nomeProduto} do carrinho">×</button>
    `;

    // 3. ADICIONAR O ITEM NO DOM (dentro da div .carrinho-itens)
    carrinhoItensDiv.appendChild(itemCarrinho);

    // 4. ADICIONAR DADOS NO ARRAY PARA CONTROLE
    // Extraímos apenas o valor numérico do preço (ex: "R$ 99,90" → 99.90)
    const precoNumerico = parseFloat(precoProduto.replace('R$', '').replace(',', '.').trim());
    carrinhoArray.push({
        nome: nomeProduto,
        preco: precoNumerico,
        imagem: imagemProduto
    });

    // 5. ATUALIZAR O TOTAL
    atualizarTotalCarrinho();

    // 6. ADICIONAR FUNÇÃO DE REMOVER ITEM AO BOTÃO
    const btnRemover = itemCarrinho.querySelector('.carrinho-item-remover');
    btnRemover.addEventListener('click', () => {
        removerProdutoDoCarrinho(itemCarrinho, precoNumerico);
    });

    // 7. ABRIR O CARRINHO AUTOMATICAMENTE
    abrirCarrinho();
}

// FUNÇÃO: Atualizar Total do Carrinho
function atualizarTotalCarrinho() {
    // Percorre o array e soma todos os preços
    const total = carrinhoArray.reduce((soma, produto) => soma + produto.preco, 0);
    
    // Formata para moeda brasileira (R$ 999,90)
    const totalFormatado = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Atualiza o elemento no DOM
    carrinhoTotalValor.textContent = totalFormatado;
}

// FUNÇÃO: Remover Produto do Carrinho
function removerProdutoDoCarrinho(elementoItem, preco) {
    // Remove o elemento HTML do DOM
    elementoItem.remove();

    // Remove do array (encontra o índice e remove)
    const indice = carrinhoArray.findIndex(p => p.preco === preco);
    if (indice > -1) {
        carrinhoArray.splice(indice, 1);
    }

    // Atualiza o total
    atualizarTotalCarrinho();

    // Se carrinhos ficar vazio, exibe a mensagem novamente
    if (carrinhoArray.length === 0) {
        carrinhoItensDiv.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    }
}

// ===================================================
// ESCUTANDO OS CLIQUES NOS BOTÕES "ADICIONAR"
// ===================================================

// PASSO 1: Seleciona TODOS os botões "Adicionar ao Carrinho"
const botoesAdicionar = document.querySelectorAll('.produtos-card button');

// PASSO 2: Adiciona event listener em cada botão
botoesAdicionar.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        
        // PASSO 3: Encontra o card pai do botão clicado
        // .closest() percorre a árvore DOM para CIMA até encontrar um elemento com a classe '.produtos-card'
        // É como dar um "jump" do botão para o container pai mais próximo
        const card = evento.target.closest('.produtos-card');

        // PASSO 4: EXTRAI OS DADOS do card encontrado
        // querySelector dentro do card busca apenas NAQUELE card específico
        
        // GET NOME: Encontra a primeira tag <h3> dentro do card
        const nomeProduto = card.querySelector('h3').textContent;
        
        // GET PREÇO: Encontra o parágrafo com classe 'preco'
        const precoProduto = card.querySelector('.preco').textContent;
        
        // GET IMAGEM: Encontra a tag <img> e pega o atributo 'src'
        const imagemProduto = card.querySelector('img').getAttribute('src');

        // PASSO 5: Chama a função para adicionar o produto
        adicionarProdutoAoCarrinho(nomeProduto, precoProduto, imagemProduto);

        console.log('✓ Produto adicionado:', { nomeProduto, precoProduto, imagemProduto });
    });
});