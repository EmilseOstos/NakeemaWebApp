package com.nakeema.controlador;

import com.nakeema.dao.ServicioDAO;
import com.nakeema.modelo.Servicio;
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
                int id = Integer.parseInt(pathInfo.substring(1));
                Servicio servicio = servicioDAO.obtenerPorId(id);
                response.getWriter().write(gson.toJson(servicio));
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

            Servicio servicio = gson.fromJson(sb.toString(), Servicio.class);
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

            Servicio servicio = gson.fromJson(sb.toString(), Servicio.class);
            boolean actualizado = servicioDAO.actualizarServicio(servicio);

            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Servicio actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar servicio\"}");
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
            boolean eliminado = servicioDAO.eliminarServicio(id);

            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Servicio eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar servicio\"}");
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