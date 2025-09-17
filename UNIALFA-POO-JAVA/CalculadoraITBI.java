import javax.swing.JOptionPane;

public class CalculadoraITBI {

    public static void main(String[] args) {
        // Obter o valor da transação
        String valorTransacaoStr = JOptionPane.showInputDialog("Digite o valor da transação:");
        double valorTransacao = Double.parseDouble(valorTransacaoStr);

        // Obter o valor venal de referência
        String valorVenalStr = JOptionPane.showInputDialog("Digite o valor venal de referência:");
        double valorVenal = Double.parseDouble(valorVenalStr);

        // Obter o percentual de imposto
        String percentualImpostoStr = JOptionPane.showInputDialog("Digite o percentual de imposto (ex: 2.5):");
        double percentualImposto = Double.parseDouble(percentualImpostoStr);

        // Encontrar o maior valor entre a transação e o valor venal
        double baseDeCalculo;
        if (valorTransacao > valorVenal) {
            baseDeCalculo = valorTransacao;
        } else {
            baseDeCalculo = valorVenal;
        }

        // Calcular o valor do imposto
        double valorDoImposto = (baseDeCalculo * percentualImposto) / 100;

        // Exibir o resultado
        JOptionPane.showMessageDialog(null, "O valor do imposto a ser pago (ITBI) é: R$ " + String.format("%.2f", valorDoImposto));
    }
}
