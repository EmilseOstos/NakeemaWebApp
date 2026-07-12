package com.nakeema.modelo;

/**
 * Clase modelo (POJO) que representa la entidad Servicio en el sistema Nakeema.
 * Corresponde a la tabla 'servicios' en la base de datos nakeemadb.
 * Un servicio vincula un cliente con un técnico asignado, incluyendo
 * su descripción, estado de avance y fechas de seguimiento.
 * 
 * @author Equipo Nakeema
 * @version 1.0
 */
public class Servicio {

    /** Identificador único del servicio (PK auto-incremental) */
    private int idServicio;

    /** FK - Identificador del cliente que solicitó el servicio */
    private int idCliente;

    /** FK - Identificador del técnico asignado al servicio */
    private int idTecnico;

    /** Descripción detallada del servicio solicitado */
    private String descripcion;

    /** Estado actual del servicio: pendiente, en_progreso, completado, cancelado */
    private String estado;

    /** Fecha y hora de creación del servicio (formato ISO 8601) */
    private String fechaCreacion;

    /** Fecha y hora de finalización del servicio (null si no ha sido completado) */
    private String fechaCompletado;

    /** Constructor vacío requerido por frameworks de serialización (Gson) */
    public Servicio() {}

    /**
     * Constructor con todos los atributos del servicio.
     * @param idServicio      Identificador único del servicio
     * @param idCliente       FK del cliente solicitante
     * @param idTecnico       FK del técnico asignado
     * @param descripcion     Descripción del servicio
     * @param estado          Estado actual del servicio
     * @param fechaCreacion   Fecha de creación
     * @param fechaCompletado Fecha de finalización (puede ser null)
     */
    public Servicio(int idServicio, int idCliente, int idTecnico, String descripcion, 
                    String estado, String fechaCreacion, String fechaCompletado) {
        this.idServicio = idServicio;
        this.idCliente = idCliente;
        this.idTecnico = idTecnico;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaCompletado = fechaCompletado;
    }

    // ==================== Getters y Setters ====================

    public int getIdServicio() { return idServicio; }
    public void setIdServicio(int idServicio) { this.idServicio = idServicio; }

    public int getIdCliente() { return idCliente; }
    public void setIdCliente(int idCliente) { this.idCliente = idCliente; }

    public int getIdTecnico() { return idTecnico; }
    public void setIdTecnico(int idTecnico) { this.idTecnico = idTecnico; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(String fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public String getFechaCompletado() { return fechaCompletado; }
    public void setFechaCompletado(String fechaCompletado) { this.fechaCompletado = fechaCompletado; }
}