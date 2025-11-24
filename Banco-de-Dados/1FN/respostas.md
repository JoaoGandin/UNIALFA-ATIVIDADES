# Respostas Exercícios – Primeira Forma Normal (1FN)

## Exercício 1 – Conceito

Uma tabela está na primeira forma normal (1FN) quando todos os seus atributos possuem valores atômicos, ou seja, indivisíveis e não existem grupos repetidos ou listas dentro das colunas, cada célula deve conter apenas um único valor e cada linha deve representar uma entidade única.

## Exercício 2 – Identificação

A tabela não está em 1FN, pois o atributo "disciplinas" contém mais de um valor em uma única célula (valores multivalorados). Isso viola o princípio dos valores atômicos.

## Exercício 3 – Conversão

| Aluno | Disciplina |
| ----- | ---------- |
| João  | Matemática |
| João  | Física     |
| Maria | Química    |
| Pedro | História   |
| Pedro | Geografia  |
| Pedro | Filosofia  |

Agora cada célula contém apenas um valor atômico, respeitando a 1FN.

---

## Exercício 4 – Valores Atômicos

Valores atômicos são aqueles que não podem ser divididos em partes menores significativas. Por exemplo: o campo telefone = "1234-5678", "9889-5432" não é atômico porquem contem dois números. A forma correta seria criar uma tabela seperada com um telefone por linha.

### Exemplo Incorreto

| Nome | Telefones            |
| ---- | -------------------- |
| Ana  | 9999-1111, 9888-2222 |

---

### Exemplo Correto

| Nome | Telefone  |
| ---- | --------- |
| Ana  | 9999-1111 |
| Ana  | 9888-2222 |

---

**Assim, a tabela fica em conformidade com a 1FN.**

## Exercício 5 – Tabela com Repetição

1. A tabela não está na 1FN.

2. Tabela na 1FN:

| Pedido | Produto | Quantidade |
| ------ | ------- | ---------- |
| 001    | Caneta  | 10         |
| 001    | Lápis   | 5          |
| 002    | Caderno | 2          |

## Exercício 6 – Identificador

Dever haver chave primária para que seja possível uma indentificação única que não se repete sendo assim possível localizar e indentificar precisamente o dado, para não houver confusão/erro de dados.

- Exemplo:

### Alunos Reprovados

| Nome             | CPF                |
| ---------------- | ------------------ |
| João Batista     | 000.000.000-**01** |
| Maria Eduarda    | 000.000.000-03     |
| William Henrique | 000.000.000-04     |

### Aluno Aprovados

| Nome         | CPF                |
| ------------ | ------------------ |
| João Batista | 000.000.000-**02** |
| Maria José   | 000.000.000-05     |

---

Nesse exemplo vemos que se não tivéssemos a chave primária (CPF) não saberiamos qual João Batista seria aprovado ou reprovado.

## Exercício 7 – Multivalorados

### Problema

O problema é que a coluna alergias possui valres múltiplos em cada célula, o que viola a 1FN.

---

### Solução Tabela Alergia

| Id_Alergia | Id_Paciente | Alergia       |
| ---------- | ----------- | ------------- |
| 001        | 1           | Polén         |
| 002        | 1           | Penicilina    |
| 003        | 2           | Frutos do Mar |

## Exercício 8 – Exercício Prático

### Tabela Livros

| livroID | Titulo                | AutorID | AutorNome    |
| ------- | --------------------- | ------- | ------------ |
| 1       | Banco de dados avan.  | 10      | Silvio Meira |
| 1       | Banco de dados avan.  | 11      | João Silva   |
| 2       | Lógica de programação | 12      | Maria Souza  |

---

Cada registro representa uma associação única entre livro e autor, garantindo que todos os atributos tenham valores atômicos.

## Exercício 9 – Teoria e Prática

Na Primeira Forma Normal (1FN), não é permitido armazenar listas, conjuntos ou valores compostos em um campo, pois cada célula deve conter apenas um valor simples.

### Exemplo que Viola a 1FN

| ID_Aluno | Nome        | Telefones                      |
| -------- | ----------- | ------------------------------ |
| 1        | Maria Silva | (62)99999-0000, (62)98888-1111 |
| 2        | João Lima   | (62)97777-2222, (62)96666-3333 |

Problema: o campo “Telefones” contém vários valores na mesma célula, o que quebra a atomicidade dos dados.

---

### Exemplo Correto de 1FN

### Tabela Aluno

| ID_Aluno | Nome        |
| -------- | ----------- |
| 1        | Maria Silva |
| 2        | João Lima   |

---

### Tabela Telefone

| ID_Telefone | ID_Aluno | Telefone       |
| ----------- | -------- | -------------- |
| 1           | 1        | (62)99999-0000 |
| 2           | 1        | (62)98888-1111 |
| 3           | 2        | (62)97777-2222 |
| 4           | 2        | (62)96666-3333 |

## Exercício 10 – Revisão

1. A tabela não está na 1FN.

2. Tabela na 1FN:

| Id  | Funcionario | CPF |
| --- | ----------- | --- |
| 001 | Carlos      | XXX |
| 002 | Marina      | XXX |
| 003 | Roberto     | XXX |

---

| Id  | Projetos |
| --- | -------- |
| 001 | P1       |
| 001 | P2       |
| 002 | P2       |
| 003 | P3       |
| 003 | P4       |
| 003 | P5       |
