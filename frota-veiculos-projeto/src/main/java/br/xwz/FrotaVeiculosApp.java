package br.xwz;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import br.xwz.dao.VeiculoDAO;
import br.xwz.model.Carro;
import br.xwz.model.Moto;
import br.xwz.model.Veiculo;

public class FrotaVeiculosApp {

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/frota_veiculos", "root", "@@Bruna0818");
        ){
            
            VeiculoDAO veiculoDAO = new VeiculoDAO(connection);
            
            Veiculo carro = new Carro(0, "Fusca", "Volkswagen", 1970, 15000.00, 4, "Gasolina");
            veiculoDAO.cadastrar(carro);
            
            Veiculo moto = new Moto(0, "Hornet", "Honda", 2015, 30000.00, 600);
            veiculoDAO.cadastrar(moto);
            
            System.out.println("Lista de veículos cadastrados:");
            for (Veiculo v : veiculoDAO.listarVeiculos()) {
                System.out.println(v.getModelo() + " - " + v.getTipo());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
