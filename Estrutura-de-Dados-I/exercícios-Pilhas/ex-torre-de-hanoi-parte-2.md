---

# 🧩 20 Perguntas — Torre de Hanói em Java

## 💻 Parte 2 – Código Java

11. Qual é o papel dos parâmetros `origem`, `destino` e `auxiliar` no método `moverDiscos()`? 
R. 

12. O que acontece se o caso base `if (n == 1)` for removido do código?  
R.

13. No trecho abaixo, o que significa a linha `moverDiscos(n - 1, origem, auxiliar, destino);`?
R.


    ```java
    moverDiscos(n - 1, origem, auxiliar, destino);
    System.out.println("Mover disco " + n + " de " + origem + " para " + destino);
    moverDiscos(n - 1, auxiliar, destino, origem);
    ```
R.

14. Por que o algoritmo chama o próprio método dentro dele (recursão)?  
R.

15. O que a função `System.out.println()` exibe em cada iteração da função recursiva? 
R.

16. Como o número de chamadas recursivas está relacionado ao número de discos (`n`)?  
R.

17. O que aconteceria se os parâmetros `destino` e `auxiliar` fossem trocados na primeira chamada recursiva?
R.

18. Qual é o tipo de dado utilizado para representar as hastes (`A`, `B`, `C`) no código?  
R.

19. No programa com contador de movimentos, qual é a finalidade da variável `contador`?  
R.

20. Se `n = 4`, quantos movimentos o programa imprimirá no total?
R.


---