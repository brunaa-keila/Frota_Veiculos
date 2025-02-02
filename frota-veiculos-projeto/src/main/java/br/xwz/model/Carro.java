package br.xwz.model;

import javax.persistence.Entity;

@Entity
public class Carro extends Veiculo {
    private int quantidadePortas;
    private String tipoCombustivel;

    public Carro() {}

    public Carro(int id, String modelo, String fabricante, int ano, double preco, int quantidadePortas, String tipoCombustivel) {
        super(id, modelo, fabricante, ano, preco);
        this.quantidadePortas = quantidadePortas;
        this.tipoCombustivel = tipoCombustivel;
    }

    public int getQuantidadePortas() {
        return quantidadePortas;
    }

    public void setQuantidadePortas(int quantidadePortas) {
        this.quantidadePortas = quantidadePortas;
    }

    public String getTipoCombustivel() {
        return tipoCombustivel;
    }

    public void setTipoCombustivel(String tipoCombustivel) {
        this.tipoCombustivel = tipoCombustivel;
    }

    @Override
    public String getTipo() {
        return "Carro";
    }
}
