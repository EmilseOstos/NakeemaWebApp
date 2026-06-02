package com.nakeema.dao;

import com.nakeema.conexion.Conexion;
import com.nakeema.modelo.Servicio;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ServicioDAO {
    
    public boolean crearServicio(Servicio servicio) {
        String sql = "INSERT INTO servicios (id_cliente, id_tecnico, descripcion, estado, fecha_creacion, fecha_completado) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, servicio.getIdCliente());
            stmt.setInt(2, servicio.getIdTecnico());
            stmt.setString(3, servicio.getDescripcion());
            stmt.setString(4, servicio.getEstado());
            stmt.setString(5, servicio.getFechaCreacion());
            stmt.setString(6, servicio.getFechaCompletado());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Servicio obtenerPorId(int idServicio) {
        String sql = "SELECT * FROM servicios WHERE id_servicio = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idServicio);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Servicio(
                    rs.getInt("id_servicio"),
                    rs.getInt("id_cliente"),
                    rs.getInt("id_tecnico"),
                    rs.getString("descripcion"),
                    rs.getString("estado"),
                    rs.getString("fecha_creacion"),
                    rs.getString("fecha_completado")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Servicio> obtenerTodos() {
        List<Servicio> servicios = new ArrayList<>();
        String sql = "SELECT * FROM servicios";
        try (Connection con = Conexion.getConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                servicios.add(new Servicio(
                    rs.getInt("id_servicio"),
                    rs.getInt("id_cliente"),
                    rs.getInt("id_tecnico"),
                    rs.getString("descripcion"),
                    rs.getString("estado"),
                    rs.getString("fecha_creacion"),
                    rs.getString("fecha_completado")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return servicios;
    }

    public boolean actualizarServicio(Servicio servicio) {
        String sql = "UPDATE servicios SET id_cliente = ?, id_tecnico = ?, descripcion = ?, estado = ?, fecha_completado = ? WHERE id_servicio = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, servicio.getIdCliente());
            stmt.setInt(2, servicio.getIdTecnico());
            stmt.setString(3, servicio.getDescripcion());
            stmt.setString(4, servicio.getEstado());
            stmt.setString(5, servicio.getFechaCompletado());
            stmt.setInt(6, servicio.getIdServicio());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminarServicio(int idServicio) {
        String sql = "DELETE FROM servicios WHERE id_servicio = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement stmt = con.prepareStatement(sql)) {
            stmt.setInt(1, idServicio);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
