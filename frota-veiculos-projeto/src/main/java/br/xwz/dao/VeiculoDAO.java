package br.xwz.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import br.xwz.model.Carro;
import br.xwz.model.Moto;
import br.xwz.model.Veiculo;

public class VeiculoDAO {
    private Connection connection;

    public VeiculoDAO(Connection connection) {
        this.connection = connection;
    }

    public void cadastrar(Veiculo veiculo) throws SQLException {
        String query = "INSERT INTO veiculos (modelo, fabricante, ano, preco, tipo, quantidadePortas, tipoCombustivel, cilindrada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, veiculo.getModelo());
            preparedStatement.setString(2, veiculo.getFabricante());
            preparedStatement.setInt(3, veiculo.getAno());
            preparedStatement.setDouble(4, veiculo.getPreco());

            preparedStatement.setString(5, veiculo.getTipo());

            if (veiculo instanceof Carro) {
                Carro carro = (Carro) veiculo;
                preparedStatement.setInt(6, carro.getQuantidadePortas());
                preparedStatement.setString(7, carro.getTipoCombustivel());
                preparedStatement.setNull(8, Types.INTEGER); // Moto não possui cilindrada
            } else if (veiculo instanceof Moto) {
                Moto moto = (Moto) veiculo;
                preparedStatement.setNull(6, Types.INTEGER); // Carro não possui cilindrada
                preparedStatement.setNull(7, Types.VARCHAR); // Carro não tem tipoCombustível
                preparedStatement.setInt(8, moto.getCilindrada());
            }

            preparedStatement.executeUpdate();
        }
    }

    public List<Veiculo> listarVeiculos() throws SQLException {
        List<Veiculo> veiculos = new ArrayList<>();
        String query = "SELECT * FROM veiculos";

        try (Statement statement = connection.createStatement(); ResultSet resultSet = statement.executeQuery(query)) {
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String modelo = resultSet.getString("modelo");
                String fabricante = resultSet.getString("fabricante");
                int ano = resultSet.getInt("ano");
                double preco = resultSet.getDouble("preco");
                String tipo = resultSet.getString("tipo");

                Veiculo veiculo = null;

                if ("carro".equalsIgnoreCase(tipo)) {
                    int quantidadePortas = resultSet.getInt("quantidadePortas");
                    String tipoCombustivel = resultSet.getString("tipoCombustivel");
                    veiculo = new Carro(id, modelo, fabricante, ano, preco, quantidadePortas, tipoCombustivel);
                } else if ("moto".equalsIgnoreCase(tipo)) {
                    int cilindrada = resultSet.getInt("cilindrada");
                    veiculo = new Moto(id, modelo, fabricante, ano, preco, cilindrada);
                }

                if (veiculo != null) {
                    veiculos.add(veiculo);
                }
            }
        }

        return veiculos;
    }
}
