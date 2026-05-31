<?php
/**
 * Arquivo de Conexão com o Banco de Dados
 * E-commerce de Materiais Pedagógicos
 * 
 * Este arquivo estabelece a conexão com o MySQL usando mysqli
 * Configuração padrão do XAMPP
 */

// Definir headers para UTF-8
header('Content-Type: text/html; charset=utf-8');

// Configurações de conexão (suporta Docker e XAMPP local)
$host = getenv('DB_HOST') ?: 'localhost';
$usuario = getenv('DB_USER') ?: 'root';
$senha = getenv('DB_PASSWORD') ?: '';
$banco = getenv('DB_NAME') ?: 'loja_pedagogica';

// Criar conexão com MySQLi
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar se houve erro na conexão
if ($conn->connect_error) {
    die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
}

// Definir charset para UTF-8 (suporte a acentos e caracteres especiais)
mysqli_set_charset($conn, 'utf8mb4');

// Sucesso na conexão (comentado para não exibir em produção)
// echo "Conexão com o banco de dados estabelecida com sucesso!";

?>
