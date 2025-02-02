package br.xwz.model;

public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(int id, String modelo, String fabricante, int ano, double preco, int cilindrada) {
        super(id, modelo, fabricante, ano, preco);
        this.cilindrada = cilindrada;
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }

    @Override
    public String getTipo() {
        return "Moto";
    }
}
