import java.util.Scanner;

public class Atividade01 {
    

    public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    
    int n1, n2, n3, multiplicacao;
        System.out.println("Digite um numero: ");
        n1 = Integer.parseInt(input.nextLine());
        
        System.out.println("Digite um numero: ");
        n2 = Integer.parseInt(input.nextLine());
        
        System.out.println("Digite um numero: ");
        n3 = Integer.parseInt(input.nextLine());
        
        multiplicacao = n1 * n2 * n3;
        
        System.out.println("resultado da multiplicacao: " + multiplicacao);
    }
    
}
