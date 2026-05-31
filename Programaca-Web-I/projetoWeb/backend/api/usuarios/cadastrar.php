<?php
/**
 * API de Cadastro de Usuários
 * E-commerce de Materiais Pedagógicos
 * 
 * Endpoint: POST /backend/api/usuarios/cadastrar.php
 * Recebe dados de cadastro e insere novo usuário no banco de dados
 */

// Incluir arquivo de conexão
require_once '../../config/conexao.php';

// Definir headers para JSON e CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar se a requisição é OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método HTTP não permitido. Use POST.'
    ]);
    exit();
}

// Receber dados do formulário
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';
$confirmacao_senha = isset($_POST['confirmacao_senha']) ? $_POST['confirmacao_senha'] : '';

// Validar campos vazios
if (empty($nome)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O campo nome é obrigatório.'
    ]);
    exit();
}

if (empty($email)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O campo email é obrigatório.'
    ]);
    exit();
}

if (empty($senha)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O campo senha é obrigatório.'
    ]);
    exit();
}

if (empty($confirmacao_senha)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O campo confirmação de senha é obrigatório.'
    ]);
    exit();
}

// Validar se senha e confirmação de senha são iguais
if ($senha !== $confirmacao_senha) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'As senhas não correspondem.'
    ]);
    exit();
}

// Validar formato do email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O email informado é inválido.'
    ]);
    exit();
}

// Validar comprimento mínimo da senha
if (strlen($senha) < 6) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve ter no mínimo 6 caracteres.'
    ]);
    exit();
}

// Preparar statement para verificar se o email já existe
$sql_verificar = 'SELECT id FROM usuarios WHERE email = ?';
$stmt_verificar = $conn->prepare($sql_verificar);

if ($stmt_verificar === false) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao preparar verificação de email.'
    ]);
    exit();
}

// Vincular parâmetro e executar
$stmt_verificar->bind_param('s', $email);
$stmt_verificar->execute();
$resultado_verificar = $stmt_verificar->get_result();

// Verificar se o email já está cadastrado
if ($resultado_verificar->num_rows > 0) {
    $stmt_verificar->close();
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Este email já está cadastrado no sistema.'
    ]);
    exit();
}

$stmt_verificar->close();

// Criptografar a senha
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

// Preparar statement para inserir novo usuário
$sql_inserir = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
$stmt_inserir = $conn->prepare($sql_inserir);

if ($stmt_inserir === false) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao preparar inserção de usuário.'
    ]);
    exit();
}

// Vincular parâmetros e executar
$stmt_inserir->bind_param('sss', $nome, $email, $senha_hash);

if ($stmt_inserir->execute()) {
    $stmt_inserir->close();
    $conn->close();
    
    http_response_code(201);
    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Usuário cadastrado com sucesso!'
    ]);
} else {
    $stmt_inserir->close();
    $conn->close();
    
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao cadastrar usuário: ' . $conn->error
    ]);
}

exit();
?>
