// Importa as classes do pacote "animais"
import animais.Animal;
import animais.Cachorro;
import animais.Gato;
import animais.Camelo;
import animais.Cavalo;
import animais.Tubarao;

// Classe principal com o método main
public class Heranca {
    public static void main(String[] args) {
        // Criando um objeto da superclasse Animal
        Animal a = new Animal();
        a.emitirSom();  // Saída: O animal faz um som.

        // Criando um objeto da subclasse Cachorro
        Cachorro c = new Cachorro();
        c.nome = "Rex";  // Acessando atributo herdado
        c.raca = "Pastor Alemao"; // Acessando atributo herdado
        c.peso = 30.00;
        c.emitirSom();   // Saída: O cachorro late: Au Au!
        System.out.println("Nome do cachorro: " + c.nome);
        System.out.println("Raca do cachorro: " + c.raca);
        System.out.println("Peso do cachorro: " + c.peso + "kg");
        System.out.println(""); //Quebrar linha

        // Criando um objeto da subclasse Gato
        Gato g = new Gato();
        g.nome = "Mimi";  // Acessando atributo herdado
        g.emitirSom();    // Saída: O gato mia: Miau!
        g.raca = "Ragdoll"; // Acessando atributo herdado
        g.peso = 5.5;
        System.out.println("Nome do gato: " + g.nome);
        System.out.println("Raca do gato: " + g.raca);
        System.out.println("Peso do gato: " + g.peso + "kg");
        System.out.println("");//Quebrar linha
        
        Camelo ca = new Camelo();
        ca.nome = "Jamal";
        ca.raca = "Kharai";   
        ca.peso = 500.00; 
        ca.emitirSom();   
        System.out.println("Nome do camelo: " + ca.nome);
        System.out.println("Raca do camelo: " + ca.raca);
        System.out.println("Peso do camelo: " + ca.peso + "kg");
        System.out.println("");//Quebrar linha
        
        Cavalo cav = new Cavalo();
        cav.nome = "Pocoto";
        cav.raca = "Frisio";   
        cav.peso = 660.00; 
        cav.emitirSom();   
        System.out.println("Nome do cavalo: " + cav.nome);
        System.out.println("Raca do cavalo: " + cav.raca);
        System.out.println("Peso do cavalo: " + cav.peso + "kg");
        System.out.println("");//Quebrar linha
        
        Tubarao t = new Tubarao();
        t.nome = "Bruce";
        t.raca = "Tubarao branco";   
        t.peso = 873.20; 
        t.emitirSom();   
        System.out.println("Nome do tubarao: " + t.nome);
        System.out.println("Raca do tubarao: " + t.raca);
        System.out.println("Peso do tubarao: " + t.peso + "kg");
        System.out.println("");//Quebrar linha
        
        
        
    }
}