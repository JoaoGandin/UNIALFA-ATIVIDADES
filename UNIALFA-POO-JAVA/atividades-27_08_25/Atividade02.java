import java.util.Scanner;

public class Atividade02 {

    public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    float imc, peso, altura;
        System.out.println("Digite seu peso: ");
        peso = Float.parseFloat(input.nextLine());
        
        System.out.println("Digite sua altura em metros: ");
        altura = Float.parseFloat(input.nextLine());
        
        imc = peso / (altura * altura);
        
        System.out.printf("Seu IMC é: %.2f", imc);
    
    }
    
}
