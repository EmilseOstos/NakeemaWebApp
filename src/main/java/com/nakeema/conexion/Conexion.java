package com.nakeema.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase utilitaria para gestionar la conexión JDBC a la base de datos MySQL.
 * Implementa el patrón Singleton de conexión utilizando el driver MySQL Connector/J.
 * 
 * Configuración:
 * - Host: 127.0.0.1 (localhost vía TCP, evita problemas con sockets Unix)
 * - Puerto: 3306 (puerto estándar de MySQL)
 * - Base de datos: nakeemadb
 * - Usuario: root (sin contraseña para entorno de desarrollo local XAMPP)
 * 
 * @author Equipo Nakeema
 * @version 1.0
 */
public class Conexion {
    
    /** URL de conexión JDBC con parámetros de configuración */
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/nakeemadb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";

    /** Usuario de la base de datos */
    private static final String USER = "root";

    /** Contraseña de la base de datos (vacía en XAMPP por defecto) */
    private static final String PASSWORD = ""; 

    /**
     * Obtiene una nueva conexión a la base de datos MySQL.
     * Carga el driver JDBC de MySQL y establece la conexión usando las credenciales configuradas.
     * 
     * @return Connection objeto de conexión activa a la base de datos
     * @throws SQLException si ocurre un error al establecer la conexión
     */
    public static Connection getConexion() throws SQLException {
        try {
            // Cargar el driver JDBC de MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("❌ Driver MySQL no encontrado: " + e.getMessage());
        }
        // Retornar la conexión establecida con la base de datos
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}