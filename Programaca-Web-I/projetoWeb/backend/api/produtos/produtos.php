<?php
/**
 * API REST de Produtos
 * E-commerce de Materiais Pedagógicos
 * 
 * Endpoint: /backend/api/produtos/produtos.php
 * Métodos suportados: GET, POST, PUT, DELETE
 */

// Incluir arquivo de conexão
require_once '../../config/conexao.php';

// Definir headers para JSON e CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar se a requisição é OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obter o método HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// === GET: Listar todos os produtos ===
if ($metodo === 'GET') {
    $sql = 'SELECT id, nome, descricao, preco, estoque, imagem FROM produtos ORDER BY id DESC';
    $resultado = $conn->query($sql);

    if ($resultado === false) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao buscar produtos.'
        ]);
        exit();
    }

    $produtos = [];
    while ($linha = $resultado->fetch_assoc()) {
        $produtos[] = $linha;
    }

    $conn->close();

    http_response_code(200);
    echo json_encode([
        'sucesso' => true,
        'produtos' => $produtos,
        'total' => count($produtos)
    ]);
    exit();
}

// === POST: Cadastrar novo produto ===
if ($metodo === 'POST') {
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $descricao = isset($_POST['descricao']) ? trim($_POST['descricao']) : '';
    $preco = isset($_POST['preco']) ? trim($_POST['preco']) : '';
    $estoque = isset($_POST['estoque']) ? intval($_POST['estoque']) : 0;

    // Validar campos obrigatórios
    if (empty($nome)) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O campo nome é obrigatório.'
        ]);
        exit();
    }

    if (empty($preco)) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O campo preço é obrigatório.'
        ]);
        exit();
    }

    // Validar se o preço é um número válido
    if (!is_numeric($preco) || $preco < 0) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O preço deve ser um número válido e maior que zero.'
        ]);
        exit();
    }

    // Preparar statement para inserir produto
    $sql_inserir = 'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)';
    $stmt = $conn->prepare($sql_inserir);

    if ($stmt === false) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao preparar inserção de produto.'
        ]);
        exit();
    }

    // Vincular parâmetros e executar
    $stmt->bind_param('ssdi', $nome, $descricao, $preco, $estoque);

    if ($stmt->execute()) {
        $id_inserido = $stmt->insert_id;
        $stmt->close();
        $conn->close();

        http_response_code(201);
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Produto cadastrado com sucesso!',
            'id' => $id_inserido
        ]);
    } else {
        $stmt->close();
        $conn->close();

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao cadastrar produto.'
        ]);
    }
    exit();
}

// === PUT: Atualizar produto ===
if ($metodo === 'PUT') {
    // Receber dados do body
    $dados_brutos = file_get_contents('php://input');
    parse_str($dados_brutos, $dados);

    $id = isset($dados['id']) ? intval($dados['id']) : 0;
    $nome = isset($dados['nome']) ? trim($dados['nome']) : '';
    $descricao = isset($dados['descricao']) ? trim($dados['descricao']) : '';
    $preco = isset($dados['preco']) ? trim($dados['preco']) : '';
    $estoque = isset($dados['estoque']) ? intval($dados['estoque']) : 0;

    // Validar se id foi informado
    if (empty($id)) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O ID do produto é obrigatório.'
        ]);
        exit();
    }

    // Verificar se o produto existe
    $sql_verificar = 'SELECT id FROM produtos WHERE id = ?';
    $stmt_verificar = $conn->prepare($sql_verificar);
    $stmt_verificar->bind_param('i', $id);
    $stmt_verificar->execute();
    $resultado_verificar = $stmt_verificar->get_result();

    if ($resultado_verificar->num_rows === 0) {
        $stmt_verificar->close();
        $conn->close();

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Produto não encontrado.'
        ]);
        exit();
    }

    $stmt_verificar->close();

    // Preparar statement para atualizar produto
    $sql_atualizar = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?';
    $stmt = $conn->prepare($sql_atualizar);

    if ($stmt === false) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao preparar atualização de produto.'
        ]);
        exit();
    }

    // Vincular parâmetros e executar
    $stmt->bind_param('ssdii', $nome, $descricao, $preco, $estoque, $id);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();

        http_response_code(200);
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Produto atualizado com sucesso!'
        ]);
    } else {
        $stmt->close();
        $conn->close();

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao atualizar produto.'
        ]);
    }
    exit();
}

// === DELETE: Deletar produto ===
if ($metodo === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    // Validar se id foi informado
    if (empty($id)) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O ID do produto é obrigatório.'
        ]);
        exit();
    }

    // Preparar statement para deletar produto
    $sql_deletar = 'DELETE FROM produtos WHERE id = ?';
    $stmt = $conn->prepare($sql_deletar);

    if ($stmt === false) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao preparar deleção de produto.'
        ]);
        exit();
    }

    // Vincular parâmetro e executar
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $stmt->close();
            $conn->close();

            http_response_code(200);
            echo json_encode([
                'sucesso' => true,
                'mensagem' => 'Produto removido com sucesso!'
            ]);
        } else {
            $stmt->close();
            $conn->close();

            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Produto não encontrado.'
            ]);
        }
    } else {
        $stmt->close();
        $conn->close();

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao remover produto.'
        ]);
    }
    exit();
}

// === Método não suportado ===
http_response_code(405);
echo json_encode([
    'sucesso' => false,
    'mensagem' => 'Método HTTP não permitido.'
]);
exit();
?>
