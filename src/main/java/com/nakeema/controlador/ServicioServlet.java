package com.nakeema.controlador;

import com.nakeema.dao.ServicioDAO;
import com.nakeema.modelo.Servicio;
import com.nakeema.util.Validator;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/servicios/*")
public class ServicioServlet extends HttpServlet {

    private ServicioDAO servicioDAO = new ServicioDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                List<Servicio> servicios = servicioDAO.obtenerTodos();
                response.getWriter().write(gson.toJson(servicios));
            } else {
                Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de servicio");
                if (!idVal.isValid()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                    return;
                }
                int id = Integer.parseInt(pathInfo.substring(1));
                Servicio servicio = servicioDAO.obtenerPorId(id);
                if (servicio != null) {
                    response.getWriter().write(gson.toJson(servicio));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("{\"error\": \"Servicio no encontrado\"}");
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + Validator.sanitize(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        try {
            Servicio servicio = gson.fromJson(request.getReader(), Servicio.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult descVal = Validator.validateTextLength(servicio.getDescripcion(), "Descripción", 5, 500);
            if (!descVal.isValid()) errors.append(descVal.getMessage()).append(". ");

            Validator.ValidationResult estadoVal = Validator.validateTextLength(servicio.getEstado(), "Estado", 2, 50);
            if (!estadoVal.isValid()) errors.append(estadoVal.getMessage()).append(". ");

            if (servicio.getIdCliente() <= 0) {
                errors.append("ID de cliente inválido. ");
            }
            if (servicio.getIdTecnico() < 0) {
                errors.append("ID de técnico inválido. ");
            }

            if (servicio.getFechaCreacion() != null && !servicio.getFechaCreacion().isEmpty()) {
                Validator.ValidationResult fechaVal = Validator.validateDate(servicio.getFechaCreacion(), "Fecha de creación");
                if (!fechaVal.isValid()) errors.append(fechaVal.getMessage()).append(". ");
            }

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            servicio.setDescripcion(Validator.sanitize(servicio.getDescripcion()));
            servicio.setEstado(Validator.sanitize(servicio.getEstado()));

            boolean creado = servicioDAO.crearServicio(servicio);
            if (creado) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("{\"mensaje\": \"Servicio creado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al crear servicio\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + Validator.sanitize(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        try {
            Servicio servicio = gson.fromJson(request.getReader(), Servicio.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult descVal = Validator.validateTextLength(servicio.getDescripcion(), "Descripción", 5, 500);
            if (!descVal.isValid()) errors.append(descVal.getMessage()).append(". ");

            Validator.ValidationResult estadoVal = Validator.validateTextLength(servicio.getEstado(), "Estado", 2, 50);
            if (!estadoVal.isValid()) errors.append(estadoVal.getMessage()).append(". ");

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            servicio.setDescripcion(Validator.sanitize(servicio.getDescripcion()));
            servicio.setEstado(Validator.sanitize(servicio.getEstado()));

            boolean actualizado = servicioDAO.actualizarServicio(servicio);
            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Servicio actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar servicio\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + Validator.sanitize(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        try {
            String pathInfo = request.getPathInfo();
            if (pathInfo == null || pathInfo.length() <= 1) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"ID de servicio requerido\"}");
                return;
            }
            Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de servicio");
            if (!idVal.isValid()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                return;
            }
            int id = Integer.parseInt(pathInfo.substring(1));
            boolean eliminado = servicioDAO.eliminarServicio(id);
            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Servicio eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar servicio\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + Validator.sanitize(e.getMessage()) + "\"}");
        }
    }

    private void configureResponse(HttpServletResponse response) {
        response.setContentType("application/json; charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
