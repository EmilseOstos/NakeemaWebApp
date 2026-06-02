package com.nakeema.modelo;

public class Servicio {
    private int idServicio;
    private int idCliente;
    private int idTecnico;
    private String descripcion;
    private String estado;
    private String fechaCreacion;
    private String fechaCompletado;

    public Servicio() {}

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