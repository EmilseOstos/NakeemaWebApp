package com.nakeema.dao;

import com.nakeema.conexion.Conexion;
import com.nakeema.modelo.Cliente;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ClienteDAO {
    
    public boolean registrarCliente(Cliente cliente) {
        String sql = "INSERT INTO clientes (nombre, email, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?)";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setString(1, cliente.getNombre());
            stmt.setString(2, cliente.getEmail());
            stmt.setString(3, cliente.getTelefono());
            stmt.setString(4, cliente.getDireccion());
            stmt.setString(5, cliente.getEstado());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Cliente obtenerPorId(int idCliente) {
        String sql = "SELECT * FROM clientes WHERE id_cliente = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idCliente);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Cliente(
                    rs.getInt("id_cliente"),
                    rs.getString("nombre"),
                    rs.getString("email"),
                    rs.getString("telefono"),
                    rs.getString("direccion"),
                    rs.getString("estado")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Cliente> obtenerTodos() {
        List<Cliente> clientes = new ArrayList<>();
        String sql = "SELECT * FROM clientes";
        try (Connection con = Conexion.getConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                clientes.add(new Cliente(
                    rs.getInt("id_cliente"),
                    rs.getString("nombre"),
                    rs.getString("email"),
                    rs.getString("telefono"),
                    rs.getString("direccion"),
                    rs.getString("estado")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return clientes;
    }

    public boolean actualizarCliente(Cliente cliente) {
        String sql = "UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ?, estado = ? WHERE id_cliente = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setString(1, cliente.getNombre());
            stmt.setString(2, cliente.getEmail());
            stmt.setString(3, cliente.getTelefono());
            stmt.setString(4, cliente.getDireccion());
            stmt.setString(5, cliente.getEstado());
            stmt.setInt(6, cliente.getIdCliente());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminarCliente(int idCliente) {
        String sql = "DELETE FROM clientes WHERE id_cliente = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idCliente);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}