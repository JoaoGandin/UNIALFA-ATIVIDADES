<?php
/**
 * API de Login de Usuários
 * E-commerce de Materiais Pedagógicos
 * 
 * Endpoint: POST /backend/api/usuarios/login.php
 * Recebe email e senha, autentica o usuário e inicia sessão
 */

// Incluir arquivo de conexão
require_once '../../config/conexao.php';

// Iniciar sessão
session_start();

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
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';

// Validar campos vazios
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

// Preparar statement para buscar usuário pelo email
$sql_buscar = 'SELECT id, nome, senha FROM usuarios WHERE email = ?';
$stmt_buscar = $conn->prepare($sql_buscar);

if ($stmt_buscar === false) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao preparar busca de usuário.'
    ]);
    exit();
}

// Vincular parâmetro e executar
$stmt_buscar->bind_param('s', $email);
$stmt_buscar->execute();
$resultado_buscar = $stmt_buscar->get_result();

// Verificar se o usuário foi encontrado
if ($resultado_buscar->num_rows === 0) {
    $stmt_buscar->close();
    $conn->close();
    
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Email ou senha inválidos.'
    ]);
    exit();
}

// Obter dados do usuário
$usuario = $resultado_buscar->fetch_assoc();
$stmt_buscar->close();

// Verificar a senha usando password_verify
if (!password_verify($senha, $usuario['senha'])) {
    $conn->close();
    
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Email ou senha inválidos.'
    ]);
    exit();
}

// Salvar dados da sessão
$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['usuario_nome'] = $usuario['nome'];

$conn->close();

// Retornar sucesso com dados do usuário
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Login realizado com sucesso!',
    'usuario' => [
        'id' => $usuario['id'],
        'nome' => $usuario['nome']
    ]
]);

exit();
?>
