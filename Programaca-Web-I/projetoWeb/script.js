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

/* ========================================= */
/* FORMULÁRIO DE CADASTRO                    */
/* ========================================= */

// CAPTURAR O FORMULÁRIO E O BOTÃO SUBMIT
const formularioCadastro = document.querySelector('form[aria-label="Formulário de cadastro"]');

// Verificar se o formulário existe (pode não estar em todas as páginas)
if (formularioCadastro) {
    // Capturar o botão submit dentro do formulário
    const btnSubmitCadastro = formularioCadastro.querySelector('button[type="submit"]');
    const textoBotaoOriginal = btnSubmitCadastro.textContent;

    // ESCUTAR O EVENTO SUBMIT DO FORMULÁRIO
    formularioCadastro.addEventListener('submit', async (e) => {
        // Prevenir o comportamento padrão de envio do formulário
        e.preventDefault();

        // COLETAR OS VALORES DOS CAMPOS
        const nome = document.getElementById('nome-cadastro').value.trim();
        const email = document.getElementById('email-cadastro').value.trim();
        const senha = document.getElementById('senha-cadastro').value;
        const confirmacaoSenha = document.getElementById('confirmacao-senha').value;

        // DESABILITAR O BOTÃO E MUDAR O TEXTO
        btnSubmitCadastro.disabled = true;
        btnSubmitCadastro.textContent = 'Cadastrando...';

        try {
            // CRIAR FORMDATA E ADICIONAR OS CAMPOS
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('email', email);
            formData.append('senha', senha);
            formData.append('confirmacao_senha', confirmacaoSenha);

            // ENVIAR REQUISIÇÃO FETCH
            const resposta = await fetch('backend/api/usuarios/cadastrar.php', {
                method: 'POST',
                body: formData
            });

            // CONVERTER A RESPOSTA PARA JSON
            const dados = await resposta.json();

            // VERIFICAR SE FOI SUCESSO OU ERRO
            if (dados.sucesso === true) {
                // SUCESSO: Exibir mensagem e redirecionar
                alert(dados.mensagem);
                
                // Limpar os campos do formulário
                formularioCadastro.reset();
                
                // Redirecionar para a página de login
                window.location.href = 'login.html';
            } else {
                // ERRO: Exibir mensagem de erro
                alert(dados.mensagem);
            }
        } catch (erro) {
            // ERRO DE CONEXÃO OU OUTRO PROBLEMA
            console.error('Erro ao cadastrar:', erro);
            alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
        } finally {
            // REABILITAR O BOTÃO E RESTAURAR O TEXTO (SEMPRE)
            btnSubmitCadastro.disabled = false;
            btnSubmitCadastro.textContent = textoBotaoOriginal;
        }
    });
}

/* ========================================= */
/* FORMULÁRIO DE LOGIN                       */
/* ========================================= */

// CAPTURAR O FORMULÁRIO E O BOTÃO SUBMIT
const formularioLogin = document.querySelector('form[aria-label="Formulário de login"]');

// Verificar se o formulário existe (pode não estar em todas as páginas)
if (formularioLogin) {
    // Capturar o botão submit dentro do formulário
    const btnSubmitLogin = formularioLogin.querySelector('button[type="submit"]');
    const textoBotaoLoginOriginal = btnSubmitLogin.textContent;

    // ESCUTAR O EVENTO SUBMIT DO FORMULÁRIO
    formularioLogin.addEventListener('submit', async (e) => {
        // Prevenir o comportamento padrão de envio do formulário
        e.preventDefault();

        // COLETAR OS VALORES DOS CAMPOS
        const email = document.getElementById('email-login').value.trim();
        const senha = document.getElementById('senha-login').value;

        // DESABILITAR O BOTÃO E MUDAR O TEXTO
        btnSubmitLogin.disabled = true;
        btnSubmitLogin.textContent = 'Entrando...';

        try {
            // CRIAR FORMDATA E ADICIONAR OS CAMPOS
            const formData = new FormData();
            formData.append('email', email);
            formData.append('senha', senha);

            // ENVIAR REQUISIÇÃO FETCH
            const resposta = await fetch('backend/api/usuarios/login.php', {
                method: 'POST',
                body: formData
            });

            // CONVERTER A RESPOSTA PARA JSON
            const dados = await resposta.json();

            // VERIFICAR SE FOI SUCESSO OU ERRO
            if (dados.sucesso === true) {
                // SUCESSO: Exibir mensagem e redirecionar
                alert(dados.mensagem);
                
                // Limpar os campos do formulário
                formularioLogin.reset();
                
                // Redirecionar para a página inicial
                window.location.href = 'index.html';
            } else {
                // ERRO: Exibir mensagem de erro
                alert(dados.mensagem);
            }
        } catch (erro) {
            // ERRO DE CONEXÃO OU OUTRO PROBLEMA
            console.error('Erro ao fazer login:', erro);
            alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
        } finally {
            // REABILITAR O BOTÃO E RESTAURAR O TEXTO (SEMPRE)
            btnSubmitLogin.disabled = false;
            btnSubmitLogin.textContent = textoBotaoLoginOriginal;
        }
    });
}

/* ========================================= */
/* CARREGAMENTO DE PRODUTOS DO CATÁLOGO      */
/* ========================================= */

// CAPTURAR A GRID DE PRODUTOS
const produtosGrid = document.querySelector('.produtos-grid');

// Verificar se a grid existe na página (pode não estar em todas as páginas)
if (produtosGrid) {
    // FUNÇÃO: Carregar Produtos da API
    async function carregarProdutos() {
        try {
            // EXIBIR MENSAGEM DE CARREGAMENTO
            produtosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">Carregando produtos...</p>';

            // FAZER REQUISIÇÃO FETCH GET
            const resposta = await fetch('backend/api/produtos/produtos.php', {
                method: 'GET'
            });

            // CONVERTER A RESPOSTA PARA JSON
            const dados = await resposta.json();

            // LIMPAR A GRID
            produtosGrid.innerHTML = '';

            // VERIFICAR SE HÁ PRODUTOS
            if (!dados.produtos || dados.produtos.length === 0) {
                produtosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">Nenhum produto cadastrado ainda.</p>';
                return;
            }

            // ITERAR SOBRE OS PRODUTOS E CRIAR OS CARDS
            dados.produtos.forEach((produto) => {
                // FORMATAR O PREÇO (converter ponto para vírgula)
                const precoFormatado = parseFloat(produto.preco).toFixed(2).replace('.', ',');
                
                // USAR IMAGEM PADRÃO SE NÃO HOUVER IMAGEM
                const imagemProduto = produto.imagem || 'assets/images/card1.png';

                // CRIAR O ELEMENTO HTML DO CARD
                const card = document.createElement('div');
                card.className = 'produtos-card';
                card.innerHTML = `
                    <img src="${imagemProduto}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    <p class="preco">R$ ${precoFormatado}</p>
                    <button data-id="${produto.id}">Adicionar ao Carrinho</button>
                `;

                // ADICIONAR O CARD NA GRID
                produtosGrid.appendChild(card);
            });

            // REATRIBUIR OS EVENT LISTENERS DOS BOTÕES
            reatribuirEventListenersBotoes();

        } catch (erro) {
            // ERRO AO CARREGAR OS PRODUTOS
            console.error('Erro ao carregar produtos:', erro);
            produtosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: red;">Erro ao carregar produtos.</p>';
        }
    }

    // FUNÇÃO: Reatribuir Event Listeners dos Botões
    function reatribuirEventListenersBotoes() {
        // SELECIONAR TODOS OS BOTÕES "ADICIONAR" DA GRID
        const botoesAdicionarCarrinho = produtosGrid.querySelectorAll('button');

        // ADICIONAR EVENT LISTENER EM CADA BOTÃO
        botoesAdicionarCarrinho.forEach((botao) => {
            botao.addEventListener('click', (evento) => {
                // ENCONTRAR O CARD PAI DO BOTÃO
                const card = evento.target.closest('.produtos-card');

                // EXTRAIR OS DADOS DO CARD
                const nomeProduto = card.querySelector('h3').textContent;
                const precoProduto = card.querySelector('.preco').textContent;
                const imagemProduto = card.querySelector('img').getAttribute('src');

                // CHAMAR A FUNÇÃO PARA ADICIONAR AO CARRINHO
                adicionarProdutoAoCarrinho(nomeProduto, precoProduto, imagemProduto);

                console.log('✓ Produto adicionado ao carrinho:', { nomeProduto, precoProduto, imagemProduto });
            });
        });
    }

    // CHAMAR A FUNÇÃO PARA CARREGAR OS PRODUTOS AO INICIAR A PÁGINA
    carregarProdutos();
}