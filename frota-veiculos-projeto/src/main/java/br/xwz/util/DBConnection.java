package br.xwz.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "COLOQUE_SUA_URL";
    private static final String USER = "root"; 
    private static final String PASSWORD = "senha"; 

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
