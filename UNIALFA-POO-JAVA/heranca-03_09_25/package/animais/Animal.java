package animais; // Define que essa classe pertence ao pacote "animais"

// Superclasse Animal
public class Animal {
    // Atributo comum a todos os animais
    public String nome;
    public String raca;
    public Double peso;

    // Método que será sobrescrito pelas subclasses
    public void emitirSom() {
        System.out.println("O animal faz um som.");
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getRaca(){
        return raca;
    }
    
    public void setRaca(String raca) {
        this.raca = raca;
    }
    
    public Double getPeso(){
        return peso;
    }
}