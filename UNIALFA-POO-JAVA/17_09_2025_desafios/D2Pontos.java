import java.util.Scanner;

public class D2Pontos
{
    public static void main(String[] args) {
        
        // Cria um objeto Scanner para ler a entrada do usuário
        Scanner scanner = new Scanner(System.in);

	    System.out.println("Digite os pontos do lider: ");
	    int pontosLider = scanner.nextInt();
	    
	    System.out.println("Digite os pontos do time Lanterna: ");
	    int pontosLanterna = scanner.nextInt();
	    
	    int vitoriasRestantes = (pontosLider - pontosLanterna)/3;
	    
	    System.out.println("Vitorias restantes para o time Lanterna ultrapassar ou alcançar o lider: " + vitoriasRestantes);
	}
}
