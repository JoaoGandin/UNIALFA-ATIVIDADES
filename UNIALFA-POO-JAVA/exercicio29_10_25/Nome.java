import java.util.Scanner;

public class Nome
{
	public static void main(String[] args) {
	    String nome;
	    
	    Scanner input = new Scanner(System.in);
		System.out.print("Digite o seu nome: ");
		nome = input.nextLine();

		System.out.println("Oi " + nome + "!");
	}
}