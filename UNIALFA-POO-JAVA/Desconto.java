import java.io.BufferedReader; // Importa a classe para ler texto em buffer
import java.io.InputStreamReader; // Importa a classe para ler bytes e convertê-los em caracteres
import java.io.IOException; // Importa para tratar possíveis erros de entrada/saída

public class Desconto {

    public static void main(String[] args) {
        // Cria um BufferedReader para ler da entrada padrão (System.in)
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            System.out.println("Digite o valor do produto:");
            String valorPstr = reader.readLine(); // Lê uma linha completa do console
            
            double valorProduto = Double.parseDouble(valorPstr);

            System.out.println("Digite o percentual:");
            String perStr = reader.readLine(); // Lê o percentual como String
            
            double percentual = Double.parseDouble(perStr);
            
            double valorDesconto = valorProduto * (percentual/100);
            
            System.out.println("Desconto: " + valorDesconto);
            System.out.println("Valor com o desconto: " + (valorProduto - valorDesconto));

        } catch (IOException e) {
            System.err.println("Erro ao ler a entrada: " + e.getMessage());
            e.printStackTrace(); // Exibe mais detalhes do erro para depuração
        }
    }
}0