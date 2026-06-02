package com.nakeema.modelo;

public class Tecnico {
    private int idTecnico;
    private String nombre;
    private String email;
    private String telefono;
    private String especialidad;
    private String estado;

    public Tecnico() {}

    public Tecnico(int idTecnico, String nombre, String email, String telefono, String especialidad, String estado) {
        this.idTecnico = idTecnico;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.estado = estado;
    }

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
