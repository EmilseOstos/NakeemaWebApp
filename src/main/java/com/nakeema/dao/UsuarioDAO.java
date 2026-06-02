package com.nakeema.dao;

import com.nakeema.conexion.Conexion;
import com.nakeema.modelo.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioDAO {

    // Método que devuelve el objeto Usuario completo
    public Usuario validarLogin(String usernameOEmail, String password) {
        Usuario usuario = null;
        String sql = "SELECT id, username, email, password, rol FROM usuarios WHERE (username = ? OR email = ?) AND password = ?";
        
        try (Connection cn = Conexion.getConexion();
            PreparedStatement ps = cn.prepareStatement(sql)) {
            
            ps.setString(1, usernameOEmail);
            ps.setString(2, usernameOEmail);
            ps.setString(3, password);
            
            System.out.println("[DAO] Ejecutando query con: " + usernameOEmail + " / " + password);
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuario = new Usuario(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("rol")
                    );
                    System.out.println("[DAO] ✅ Usuario encontrado: " + usuario.getUsername() + " | Rol: " + usuario.getRol());
                } else {
                    System.out.println("[DAO] ❌ Usuario NO encontrado");
                }
            }
        } catch (SQLException e) {
            System.out.println("[DAO] ❌ Error SQL: " + e.getMessage());
            e.printStackTrace();
        }
        
        return usuario;
    }

    // Método para registrar un nuevo usuario
    public boolean registrarUsuario(String username, String email, String password, String rol) {
        String sql = "INSERT INTO usuarios (username, email, password, rol) VALUES (?, ?, ?, ?)";
        
        try (Connection cn = Conexion.getConexion();
            PreparedStatement ps = cn.prepareStatement(sql)) {
            
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, password);
            ps.setString(4, rol);
            
            int filasAfectadas = ps.executeUpdate();
            System.out.println("[DAO] Registro exitoso: " + username);
            return filasAfectadas > 0;
            
        } catch (SQLException e) {
            System.out.println("[DAO] Error al registrar: " + e.getMessage());
            return false;
        }
    }

    // Método para obtener usuario por ID
    public Usuario obtenerPorId(int id) {
        Usuario usuario = null;
        String sql = "SELECT id, username, email, password, rol FROM usuarios WHERE id = ?";
        
        try (Connection cn = Conexion.getConexion();
            PreparedStatement ps = cn.prepareStatement(sql)) {
            
            ps.setInt(1, id);
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuario = new Usuario(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("rol")
                    );
                }
            }
        } catch (SQLException e) {
            System.out.println("[DAO] Error al obtener usuario: " + e.getMessage());
        }
        
        return usuario;
    }
    // ==========================================
    // MÉTODOS FALTANTES PARA CRUD COMPLETO
    // ==========================================

    // Método para actualizar un usuario existente (Update)
    public boolean actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET username = ?, email = ?, password = ?, rol = ? WHERE id = ?";
        
        try (Connection cn = Conexion.getConexion();
            PreparedStatement ps = cn.prepareStatement(sql)) {
            
            ps.setString(1, usuario.getUsername());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getPassword());
            ps.setString(4, usuario.getRol());
            ps.setInt(5, usuario.getId());
            
            int filasAfectadas = ps.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("[DAO] ✅ Usuario actualizado con éxito: " + usuario.getUsername());
                return true;
            } else {
                System.out.println("[DAO] ⚠️ No se encontró el usuario para actualizar.");
                return false;
            }
            
        } catch (SQLException e) {
            System.out.println("[DAO] ❌ Error al actualizar usuario: " + e.getMessage());
            return false;
        }
    }

    // Método para eliminar un usuario por su ID (Delete)
    public boolean eliminarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        
        try (Connection cn = Conexion.getConexion();
            PreparedStatement ps = cn.prepareStatement(sql)) {
            
            ps.setInt(1, id);
            
            int filasAfectadas = ps.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("[DAO] ✅ Usuario con ID " + id + " eliminado con éxito.");
                return true;
            } else {
                System.out.println("[DAO] ⚠️ No se encontró ningún usuario con el ID especificado.");
                return false;
            }
            
        } catch (SQLException e) {
            System.out.println("[DAO] ❌ Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }
}