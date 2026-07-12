package com.nakeema.modelo;

/**
 * Clase modelo (POJO) que representa la entidad Cliente en el sistema Nakeema.
 * Corresponde a la tabla 'clientes' en la base de datos nakeemadb.
 * Almacena los datos de contacto y estado de cada cliente registrado.
 * 
 * @author Equipo Nakeema
 * @version 1.0
 */
public class Cliente {

    /** Identificador único del cliente (PK auto-incremental) */
    private int idCliente;

    /** Nombre completo del cliente */
    private String nombre;

    /** Correo electrónico de contacto */
    private String email;

    /** Número de teléfono de contacto */
    private String telefono;

    /** Dirección física del cliente */
    private String direccion;

    /** Estado actual del cliente: activo o inactivo */
    private String estado;

    /** Constructor vacío requerido por frameworks de serialización (Gson) */
    public Cliente() {}

    /**
     * Constructor con todos los atributos del cliente.
     * @param idCliente  Identificador único
     * @param nombre     Nombre completo
     * @param email      Correo electrónico
     * @param telefono   Número de teléfono
     * @param direccion  Dirección física
     * @param estado     Estado (activo/inactivo)
     */
    public Cliente(int idCliente, String nombre, String email, String telefono, String direccion, String estado) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.estado = estado;
    }

    // ==================== Getters y Setters ====================

    public int getIdCliente() { return idCliente; }
    public void setIdCliente(int idCliente) { this.idCliente = idCliente; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}