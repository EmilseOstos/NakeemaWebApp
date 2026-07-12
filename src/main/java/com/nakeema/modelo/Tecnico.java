package com.nakeema.modelo;

/**
 * Clase modelo (POJO) que representa la entidad Tecnico en el sistema Nakeema.
 * Corresponde a la tabla 'tecnicos' en la base de datos nakeemadb.
 * Almacena la información profesional y de contacto de cada técnico de campo.
 * 
 * @author Equipo Nakeema
 * @version 1.0
 */
public class Tecnico {

    /** Identificador único del técnico (PK auto-incremental) */
    private int idTecnico;

    /** Nombre completo del técnico */
    private String nombre;

    /** Correo electrónico del técnico */
    private String email;

    /** Número de teléfono de contacto */
    private String telefono;

    /** Especialidad técnica (ej: electricidad, plomería, redes) */
    private String especialidad;

    /** Estado actual del técnico: activo, inactivo o en servicio */
    private String estado;

    /** Constructor vacío requerido por frameworks de serialización (Gson) */
    public Tecnico() {}

    /**
     * Constructor con todos los atributos del técnico.
     * @param idTecnico    Identificador único
     * @param nombre       Nombre completo
     * @param email        Correo electrónico
     * @param telefono     Número de teléfono
     * @param especialidad Área de especialización
     * @param estado       Estado (activo/inactivo/en servicio)
     */
    public Tecnico(int idTecnico, String nombre, String email, String telefono, String especialidad, String estado) {
        this.idTecnico = idTecnico;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.estado = estado;
    }

    // ==================== Getters y Setters ====================

    public int getIdTecnico() { return idTecnico; }
    public void setIdTecnico(int idTecnico) { this.idTecnico = idTecnico; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
