import java.util.Scanner;

public class Soma
{
	public static void main(String[] args) {
	    int n1;
	    int n2;
	    int total;
	    
	    Scanner input = new Scanner(System.in);
		System.out.print("Digite o primeiro número: ");
		n1 = input.nextInt();
		
		System.out.print("Digite o segundo número: ");
		n2 = input.nextInt();
		
		total = n1 + n2;

		System.out.println("Soma dos números: " + total);
	}
}