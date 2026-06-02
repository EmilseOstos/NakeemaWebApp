package com.nakeema.dao;

import com.nakeema.conexion.Conexion;
import com.nakeema.modelo.Tecnico;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TecnicoDAO {
    
    public boolean registrarTecnico(Tecnico tecnico) {
        String sql = "INSERT INTO tecnicos (nombre, email, telefono, especialidad, estado) VALUES (?, ?, ?, ?, ?)";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setString(1, tecnico.getNombre());
            stmt.setString(2, tecnico.getEmail());
            stmt.setString(3, tecnico.getTelefono());
            stmt.setString(4, tecnico.getEspecialidad());
            stmt.setString(5, tecnico.getEstado());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Tecnico obtenerPorId(int idTecnico) {
        String sql = "SELECT * FROM tecnicos WHERE id_tecnico = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idTecnico);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Tecnico(
                    rs.getInt("id_tecnico"),
                    rs.getString("nombre"),
                    rs.getString("email"),
                    rs.getString("telefono"),
                    rs.getString("especialidad"),
                    rs.getString("estado")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Tecnico> obtenerTodos() {
        List<Tecnico> tecnicos = new ArrayList<>();
        String sql = "SELECT * FROM tecnicos";
        try (Connection con = Conexion.getConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                tecnicos.add(new Tecnico(
                    rs.getInt("id_tecnico"),
                    rs.getString("nombre"),
                    rs.getString("email"),
                    rs.getString("telefono"),
                    rs.getString("especialidad"),
                    rs.getString("estado")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return tecnicos;
    }

    public boolean actualizarTecnico(Tecnico tecnico) {
        String sql = "UPDATE tecnicos SET nombre = ?, email = ?, telefono = ?, especialidad = ?, estado = ? WHERE id_tecnico = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setString(1, tecnico.getNombre());
            stmt.setString(2, tecnico.getEmail());
            stmt.setString(3, tecnico.getTelefono());
            stmt.setString(4, tecnico.getEspecialidad());
            stmt.setString(5, tecnico.getEstado());
            stmt.setInt(6, tecnico.getIdTecnico());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminarTecnico(int idTecnico) {
        String sql = "DELETE FROM tecnicos WHERE id_tecnico = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idTecnico);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
