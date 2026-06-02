package com.nakeema.controlador;

import com.nakeema.dao.TecnicoDAO;
import com.nakeema.modelo.Tecnico;
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
                int id = Integer.parseInt(pathInfo.substring(1));
                Tecnico tecnico = tecnicoDAO.obtenerPorId(id);
                response.getWriter().write(gson.toJson(tecnico));
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

            Tecnico tecnico = gson.fromJson(sb.toString(), Tecnico.class);
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

            Tecnico tecnico = gson.fromJson(sb.toString(), Tecnico.class);
            boolean actualizado = tecnicoDAO.actualizarTecnico(tecnico);

            if (actualizado) {
                response.getWriter().write("{\"mensaje\": \"Técnico actualizado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al actualizar técnico\"}");
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
            boolean eliminado = tecnicoDAO.eliminarTecnico(id);

            if (eliminado) {
                response.getWriter().write("{\"mensaje\": \"Técnico eliminado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Error al eliminar técnico\"}");
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