import java.util.Scanner;

public class Aposentado
{
	public static void main(String[] args) {
	    Scanner scanner = new Scanner(System.in);
	    
		System.out.print("Digite sua idade: ");
		int idade = scanner.nextInt();
		System.out.print("Digite quanto tempo de contribuição fez: ");
		int contribuicao = scanner.nextInt();
		System.out.print("Digite seu sexo (M/F): ");
		char sexo = scanner.next().charAt(0);
		
		if (sexo == 'F' && idade >= 60 && contribuicao >= 30){
		    System.out.print("Você pode se aposentar!");
		}else{
		    if (sexo == 'M' && idade >= 65 && contribuicao >= 35){
		    System.out.print("Você pode se aposentar!");
		    }else{
		    System.out.print("Você não pode se aposentar!");
		}
		}
		
	}
}
