import java.util.Scanner;

public class Media
{
	public static void main(String[] args) {
	    double n1;
	    double n2;
	    double n3;
	    double total;
	    
	    Scanner input = new Scanner(System.in);
		System.out.print("Digite o primeiro número: ");
		n1 = input.nextDouble();
	
		System.out.print("Digite o segundo número: ");
		n2 = input.nextDouble();
		
		System.out.print("Digite o terceiro número: ");
		n3 = input.nextDouble();
		
		total = (n1 + n2 + n3) / 3;

		System.out.println("Média aritmética: " + total);
	}
}