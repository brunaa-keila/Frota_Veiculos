package br.xwz.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/frota_veiculos";
    private static final String USER = "root"; // Altere conforme necessário
    private static final String PASSWORD = "senha"; // Altere conforme necessário

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
