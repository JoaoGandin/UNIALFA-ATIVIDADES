-- Script de inicialização do banco de dados
-- E-commerce de Materiais Pedagógicos

USE loja_pedagogica;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL DEFAULT 0,
  imagem VARCHAR(255),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para otimização
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_produtos_nome ON produtos(nome);

-- Dados de exemplo (opcional)
-- Usuário de teste
INSERT INTO usuarios (nome, email, senha) VALUES 
('Admin', 'admin@example.com', '$2y$10$92IXUNpkm1Qz6f0Expst2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW'); -- senha: password

-- Alguns produtos de exemplo
INSERT INTO produtos (nome, descricao, preco, estoque, imagem) VALUES
('Caderno A4 200 Folhas', 'Caderno com 200 folhas pautadas, ideal para anotações escolares', 25.90, 50, 'caderno-a4.jpg'),
('Lápis de Cor 12 Cores', 'Conjunto com 12 lápis de cor sortidas, qualidade escolar', 15.50, 100, 'lapis-cor.jpg'),
('Mochila Escolar', 'Mochila ergonômica com compartimentos, ideal para crianças', 89.90, 30, 'mochila.jpg'),
('Estojo Completo', 'Estojo com diversos materiais de escrita e desenho', 45.00, 40, 'estojo.jpg'),
('Régua 30cm', 'Régua plástica transparente de 30cm', 5.50, 200, 'regua.jpg');
