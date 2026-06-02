package com.nakeema.controlador;

import com.nakeema.dao.ClienteDAO;
import com.nakeema.modelo.Cliente;
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
                int id = Integer.parseInt(pathInfo.substring(1));
                Cliente cliente = clienteDAO.obtenerPorId(id);
                response.getWriter().write(gson.toJson(cliente));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        configureResponse(response);
        
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }

            Cliente cliente = gson.fromJson(sb.toString(), Cliente.class);
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
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        configureResponse(response);
        
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }

            Cliente cliente = gson.fromJson(sb.toString(), Cliente.class);
            boolean actualizado = clienteDAO.actualizarCliente(cliente);

            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Cliente actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar cliente\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        configureResponse(response);
        
        try {
            int id = Integer.parseInt(request.getPathInfo().substring(1));
            boolean eliminado = clienteDAO.eliminarCliente(id);

            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Cliente eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar cliente\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        configureResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void configureResponse(HttpServletResponse response) {
        response.setContentType("application/json; charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}