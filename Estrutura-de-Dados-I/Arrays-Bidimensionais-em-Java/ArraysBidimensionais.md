# Arrays Bidimensionais em Java
Um array bidimensional possui dois índices e possibilita que os valores sejam armazenados na forma de matrizes. A linguagem Java não suporta arrays bidimensionais como as outras linguagens (no formato linha, coluna, por exemplo), entretanto é possível obter a mesma funcionalidade criando um array de arrays. Os de uso mais comum são os que envolvem dois arrays, mas é possível cruar arrays com quantas dimensões forem necessárias. Esses arays devem ser declarados da seguinte forma:
```
Tipo-do-dado nome-do-array[][] = new tipo-do-dado [<índice 1>] [<índice 2>]
```

## Array (vetor) em Python
Em Python, o conceito de Array(vetor) pode ser implementado de algumas formas sendo a mais comum o uso de listas (nativas) ou através da biblioteca **NumPy** para operaçõe de alta perfomance.
1) Lista Python (o jeito padrão)
As listas em Python funcionam como arrays dinâmicos, o que significa que podemos armazenar diferentes tipos de dados e mudar o tamanho automaticamente.
2) NumPy array (o jeito matemático)
Para manipulação de grandes volumes de dados ou cálculos matemáticos (Data Science), usa-se a biblioteca **NumPy** que fornece arrays mais eficientes.

### Continuação do Array (vetor em Python)
Principais diferenças
- Listas: Dinâmicas, aceitam tipos mistos (inteiros, Strings, etc.);
- NumPy Arrays: Tem tamanho fixo, mas são otimizados para operações numéricas e exigem que os dados sejam do mesmo tipo.