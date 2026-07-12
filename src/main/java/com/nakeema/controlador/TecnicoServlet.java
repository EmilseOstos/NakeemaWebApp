package com.nakeema.controlador;

import com.nakeema.dao.TecnicoDAO;
import com.nakeema.modelo.Tecnico;
import com.nakeema.util.Validator;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/tecnicos/*")
public class TecnicoServlet extends HttpServlet {

    private TecnicoDAO tecnicoDAO = new TecnicoDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                List<Tecnico> tecnicos = tecnicoDAO.obtenerTodos();
                response.getWriter().write(gson.toJson(tecnicos));
            } else {
                Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de técnico");
                if (!idVal.isValid()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                    return;
                }
                int id = Integer.parseInt(pathInfo.substring(1));
                Tecnico tecnico = tecnicoDAO.obtenerPorId(id);
                if (tecnico != null) {
                    response.getWriter().write(gson.toJson(tecnico));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("{\"error\": \"Técnico no encontrado\"}");
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
            Tecnico tecnico = gson.fromJson(request.getReader(), Tecnico.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult nombreVal = Validator.validateTextLength(tecnico.getNombre(), "Nombre", 3, 100);
            if (!nombreVal.isValid()) errors.append(nombreVal.getMessage()).append(". ");

            Validator.ValidationResult emailVal = Validator.validateEmail(tecnico.getEmail());
            if (!emailVal.isValid()) errors.append(emailVal.getMessage()).append(". ");

            Validator.ValidationResult telVal = Validator.validatePhone(tecnico.getTelefono());
            if (!telVal.isValid()) errors.append(telVal.getMessage()).append(". ");

            Validator.ValidationResult espVal = Validator.validateTextLength(tecnico.getEspecialidad(), "Especialidad", 2, 100);
            if (!espVal.isValid()) errors.append(espVal.getMessage()).append(". ");

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            tecnico.setNombre(Validator.sanitize(tecnico.getNombre()));
            tecnico.setEmail(Validator.sanitize(tecnico.getEmail()));
            tecnico.setEspecialidad(Validator.sanitize(tecnico.getEspecialidad()));

            boolean creado = tecnicoDAO.registrarTecnico(tecnico);
            if (creado) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("{\"mensaje\": \"Técnico creado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al crear técnico\"}");
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
            Tecnico tecnico = gson.fromJson(request.getReader(), Tecnico.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult nombreVal = Validator.validateTextLength(tecnico.getNombre(), "Nombre", 3, 100);
            if (!nombreVal.isValid()) errors.append(nombreVal.getMessage()).append(". ");

            Validator.ValidationResult emailVal = Validator.validateEmail(tecnico.getEmail());
            if (!emailVal.isValid()) errors.append(emailVal.getMessage()).append(". ");

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            tecnico.setNombre(Validator.sanitize(tecnico.getNombre()));
            tecnico.setEmail(Validator.sanitize(tecnico.getEmail()));
            tecnico.setEspecialidad(Validator.sanitize(tecnico.getEspecialidad()));

            boolean actualizado = tecnicoDAO.actualizarTecnico(tecnico);
            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Técnico actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar técnico\"}");
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
                response.getWriter().write("{\"error\": \"ID de técnico requerido\"}");
                return;
            }
            Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de técnico");
            if (!idVal.isValid()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                return;
            }
            int id = Integer.parseInt(pathInfo.substring(1));
            boolean eliminado = tecnicoDAO.eliminarTecnico(id);
            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Técnico eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar técnico\"}");
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
