
package animais;


public class Cavalo extends Animal {
    
     // Sobrescreve o método emitirSom da superclasse
    @Override
    public void emitirSom() {
        System.out.println("O cavalo faz: iiirrrri!");
    }
}
