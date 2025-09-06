import java.util.Scanner;

public class Atividade06 {

    public static float converterCelsiusParaFahrenheit(float celsius) {
        return (celsius * 1.8f) + 32;
    }
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        float celsius, fahrenheit;

        System.out.println("Digite a temperatura em Celsius: ");
        celsius = Float.parseFloat(input.nextLine());

        fahrenheit = converterCelsiusParaFahrenheit(celsius);

        System.out.printf("A temperatura em Fahrenheit é: %.2f°F%n", fahrenheit);
        input.close();
    }
}