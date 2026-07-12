package com.nakeema.modelo;

/**
 * Clase modelo (POJO) que representa la entidad Usuario en el sistema Nakeema.
 * Corresponde a la tabla 'usuarios' en la base de datos nakeemadb.
 * Cada usuario tiene un rol asignado (admin, cliente, tecnico) que determina
 * su nivel de acceso y las vistas disponibles en la plataforma.
 * 
 * @author Equipo Nakeema
 * @version 1.0
 */
public class Usuario {

    /** Identificador único del usuario (PK auto-incremental) */
    private int id;

    /** Nombre de usuario para inicio de sesión */
    private String username;

    /** Correo electrónico del usuario */
    private String email;

    /** Contraseña del usuario */
    private String password;

    /** Rol del usuario en el sistema: admin, cliente o tecnico */
    private String rol;

    /** Constructor vacío requerido por frameworks de serialización (Gson) */
    public Usuario() {}

    /**
     * Constructor con todos los atributos del usuario.
     * @param id         Identificador único
     * @param username   Nombre de usuario
     * @param email      Correo electrónico
     * @param password   Contraseña
     * @param rol        Rol asignado (admin, cliente, tecnico)
     */
    public Usuario(int id, String username, String email, String password, String rol) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    // ==================== Getters y Setters ====================

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}