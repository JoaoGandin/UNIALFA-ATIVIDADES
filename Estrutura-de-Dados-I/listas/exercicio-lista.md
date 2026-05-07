# Exercícios sobre Listas em Java

---

## Exercício 1 (Fácil) - Lista de Cores

Crie uma lista (`ArrayList`) de 5 cores e exiba todas usando o laço `for-each`.

```java
import java.util.ArrayList;

public class Cores
{
	public static void main(String[] args) {

		ArrayList<String> ListaCores = new ArrayList<>();
		ListaCores.add("Laranja");
		ListaCores.add("Azul");
		ListaCores.add("Verde");
		ListaCores.add("Amarelo");
		ListaCores.add("Roxo");

		for (String cores : ListaCores){
		    System.out.println(cores);
		}
	}
}
```

---

## Exercício 2 (Fácil) - Soma de Números

Crie um programa que adiciona os números de 1 a 10 em uma lista e depois calcula e exibe a soma total.

```java
import java.util.ArrayList;

public class Soma
{
	public static void main(String[] args) {
		ArrayList<Integer> numeros = new ArrayList<>();
		int total = 0;
		
		for(int i = 0; i < 10; i++){
		    numeros.add(i+1);
		    total = total + numeros.get(i);
		}
		
		System.out.println("A soma dos números é: " + total);
		
	}
}
```

---

## Exercício 3 (Médio) - Cadastro até "fim"

Faça um programa que recebe nomes do usuário (via `Scanner`) até que ele digite `"fim"`. Depois exiba todos os nomes cadastrados.

```java
import java.util.ArrayList;
import java.util.Scanner;

public class Cadastro
{
	public static void main(String[] args) {
	    
	    Scanner sc = new Scanner(System.in);
	    
		ArrayList<String> nomes = new ArrayList<>();
		
		
		while(true){
		    System.out.println("Digite um nome ou fim para sair: ");
		    String entrada = sc.nextLine();
		    
		    
		    if(entrada.equalsIgnoreCase("fim")){
		        break;
		    }
		    
		    
		    nomes.add(entrada);
		}
		
		System.out.println("---Lista de nomes---");
		for (String nome : nomes){
		    System.out.println(nome);
		}
	
	sc.close();	
	}
}

```

---

## Exercício 4 (Médio) - Removendo números pequenos

Crie uma lista de números inteiros e remova todos os números **menores que 10**.

```java
import java.util.ArrayList;

public class NumerosPequenos
{
	public static void main(String[] args) {
	    
		ArrayList<Integer> numeros = new ArrayList<>();
		
		numeros.add(5);
		numeros.add(15);
		numeros.add(3);
		numeros.add(20);
		numeros.add(8);
		numeros.add(25);
		numeros.add(2);
		numeros.add(30);
		
		System.out.println(numeros);
		
		for(int i = numeros.size() - 1; i >= 0; i--){
		    if(numeros.get(i) < 10){
		        numeros.remove(i);
		    }
		    
		}
		
		System.out.print(numeros);
		
	}
}
```

---

## Exercício 5 (Médio/Difícil) - Cadastro de Produtos

Faça um cadastro de produtos com **nome** e **preço**. Depois calcule o valor total do carrinho.

```java
import java.util.ArrayList;

public class CadastroProdutos
{
	public static void main(String[] args) {
	    
		ArrayList<String> nomeProduto = new ArrayList<>();
		
		nomeProduto.add("Laranja");
		nomeProduto.add("Maçã");
		nomeProduto.add("Tangerina");
		
		ArrayList<Double> precoProduto = new ArrayList<>();
		
		precoProduto.add(1.99);
		precoProduto.add(0.99);
		precoProduto.add(2.99);
		
		double valorTotal = 0;
		
		for(int i = 0; i < precoProduto.size(); i++){
		    valorTotal = valorTotal + precoProduto.get(i);
		}
		
		for (int i = 0; i < precoProduto.size(); i++){
		    System.out.println("Produto "+ (i+1) +": "+ nomeProduto.get(i) +" - R$ " + precoProduto.get(i));
		}
		System.out.println("Total: R$" + valorTotal);
		
	}
}
```

---

## Exercício 6 (Difícil) - Agenda de Contatos

Crie uma agenda de contatos onde cada contato tem **nome** e **telefone**. Permita as operações:

1. Adicionar contato
2. Buscar contato (por nome)
3. Remover contato (por nome)
4. Listar todos os contatos
5. Sair


---

## Exercício 7 (Desafio) - Gerenciador de Tarefas com Prioridade

Crie um gerenciador de tarefas onde cada tarefa tem **descrição** (String) e **prioridade** (1 = Alta, 2 = Média, 3 = Baixa).


---

## Exercício 8 (Desafio) - Remover Duplicatas

Crie um programa que recebe números do usuário até que ele digite `0` e armazena todos em uma lista. Depois, remova todos os números **duplicados**, mantendo apenas a primeira ocorrência de cada número.


---

## Exercício 9 (Desafio) - Filas usando LinkedList

Use `LinkedList` para simular uma **fila de atendimento** (FIFO - First In, First Out).

---
## Exercício 10 (Super Desafio) - Lista de Tarefas com Arquivo

Crie um programa de lista de tarefas que **salva e carrega** as tarefas de um arquivo.
---
