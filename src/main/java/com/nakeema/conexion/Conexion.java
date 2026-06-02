package com.nakeema.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/nakeemadb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    private static final String USER = "root";
    private static final String PASSWORD = ""; 

    public static Connection getConexion() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("❌ Driver MySQL no encontrado: " + e.getMessage());
        }
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}