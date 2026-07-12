package com.nakeema.controlador;

import com.nakeema.dao.ClienteDAO;
import com.nakeema.modelo.Cliente;
import com.nakeema.util.Validator;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/clientes/*")
public class ClienteServlet extends HttpServlet {

    private ClienteDAO clienteDAO = new ClienteDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                List<Cliente> clientes = clienteDAO.obtenerTodos();
                response.getWriter().write(gson.toJson(clientes));
            } else {
                Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de cliente");
                if (!idVal.isValid()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                    return;
                }
                int id = Integer.parseInt(pathInfo.substring(1));
                Cliente cliente = clienteDAO.obtenerPorId(id);
                if (cliente != null) {
                    response.getWriter().write(gson.toJson(cliente));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("{\"error\": \"Cliente no encontrado\"}");
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
            Cliente cliente = gson.fromJson(request.getReader(), Cliente.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult nombreVal = Validator.validateTextLength(cliente.getNombre(), "Nombre", 3, 100);
            if (!nombreVal.isValid()) errors.append(nombreVal.getMessage()).append(". ");

            Validator.ValidationResult emailVal = Validator.validateEmail(cliente.getEmail());
            if (!emailVal.isValid()) errors.append(emailVal.getMessage()).append(". ");

            Validator.ValidationResult telVal = Validator.validatePhone(cliente.getTelefono());
            if (!telVal.isValid()) errors.append(telVal.getMessage()).append(". ");

            Validator.ValidationResult dirVal = Validator.validateTextLength(cliente.getDireccion(), "Dirección", 0, 200);
            if (!dirVal.isValid()) errors.append(dirVal.getMessage()).append(". ");

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            cliente.setNombre(Validator.sanitize(cliente.getNombre()));
            cliente.setEmail(Validator.sanitize(cliente.getEmail()));
            cliente.setDireccion(Validator.sanitize(cliente.getDireccion()));

            boolean creado = clienteDAO.registrarCliente(cliente);
            if (creado) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("{\"mensaje\": \"Cliente creado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al crear cliente\"}");
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
            Cliente cliente = gson.fromJson(request.getReader(), Cliente.class);

            StringBuilder errors = new StringBuilder();
            Validator.ValidationResult nombreVal = Validator.validateTextLength(cliente.getNombre(), "Nombre", 3, 100);
            if (!nombreVal.isValid()) errors.append(nombreVal.getMessage()).append(". ");

            Validator.ValidationResult emailVal = Validator.validateEmail(cliente.getEmail());
            if (!emailVal.isValid()) errors.append(emailVal.getMessage()).append(". ");

            Validator.ValidationResult telVal = Validator.validatePhone(cliente.getTelefono());
            if (!telVal.isValid()) errors.append(telVal.getMessage()).append(". ");

            if (errors.length() > 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + errors.toString().trim() + "\"}");
                return;
            }

            cliente.setNombre(Validator.sanitize(cliente.getNombre()));
            cliente.setEmail(Validator.sanitize(cliente.getEmail()));
            cliente.setDireccion(Validator.sanitize(cliente.getDireccion()));

            boolean actualizado = clienteDAO.actualizarCliente(cliente);
            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Cliente actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar cliente\"}");
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
                response.getWriter().write("{\"error\": \"ID de cliente requerido\"}");
                return;
            }
            Validator.ValidationResult idVal = Validator.validatePositiveInt(pathInfo.substring(1), "ID de cliente");
            if (!idVal.isValid()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"" + idVal.getMessage() + "\"}");
                return;
            }
            int id = Integer.parseInt(pathInfo.substring(1));
            boolean eliminado = clienteDAO.eliminarCliente(id);
            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Cliente eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar cliente\"}");
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
