package com.nakeema.controlador;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.nakeema.conexion.Conexion;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/registro-tecnico/*")
public class RegistroTecnicoServlet extends HttpServlet {

    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        String pathInfo = request.getPathInfo();
        if (pathInfo == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Tipo requerido: /solicitud o /bitacora\"}");
            return;
        }

        try {
            JsonObject body = gson.fromJson(request.getReader(), JsonObject.class);
            boolean ok;

            if (pathInfo.equals("/solicitud")) {
                ok = insertarSolicitud(body);
            } else if (pathInfo.equals("/bitacora")) {
                ok = insertarBitacora(body);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Tipo inválido. Use /solicitud o /bitacora\"}");
                return;
            }

            if (ok) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("{\"mensaje\":\"Registro guardado exitosamente\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Error al guardar\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);

        String pathInfo = request.getPathInfo();
        try {
            if (pathInfo != null && pathInfo.equals("/solicitud")) {
                List<JsonObject> list = listarSolicitudes();
                response.getWriter().write(gson.toJson(list));
            } else if (pathInfo != null && pathInfo.equals("/bitacora")) {
                List<JsonObject> list = listarBitacoras();
                response.getWriter().write(gson.toJson(list));
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Use /solicitud o /bitacora\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private boolean insertarSolicitud(JsonObject body) {
        String sql = "INSERT INTO solicitudes_materiales (material_name, quantity, service_id, urgency, justification, fecha) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection cn = Conexion.getConexion();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setString(1, getStr(body, "name"));
            ps.setInt(2, body.has("quantity") ? body.get("quantity").getAsInt() : 1);
            ps.setString(3, getStr(body, "serviceId"));
            ps.setString(4, getStr(body, "urgency"));
            ps.setString(5, getStr(body, "justification"));
            ps.setString(6, getStr(body, "fecha"));
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private boolean insertarBitacora(JsonObject body) {
        String sql = "INSERT INTO registros_servicio (service_id, description, quantity, estimated_cost, time_invested, fecha) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection cn = Conexion.getConexion();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setString(1, getStr(body, "serviceId"));
            ps.setString(2, getStr(body, "description"));
            ps.setInt(3, body.has("quantity") ? body.get("quantity").getAsInt() : 1);
            ps.setDouble(4, body.has("cost") ? body.get("cost").getAsDouble() : 0);
            ps.setString(5, getStr(body, "time"));
            ps.setString(6, getStr(body, "fecha"));
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private List<JsonObject> listarSolicitudes() throws Exception {
        List<JsonObject> list = new ArrayList<>();
        String sql = "SELECT * FROM solicitudes_materiales ORDER BY id DESC LIMIT 50";
        try (Connection cn = Conexion.getConexion();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                JsonObject obj = new JsonObject();
                obj.addProperty("id", rs.getInt("id"));
                obj.addProperty("name", rs.getString("material_name"));
                obj.addProperty("quantity", rs.getInt("quantity"));
                obj.addProperty("serviceId", rs.getString("service_id"));
                obj.addProperty("urgency", rs.getString("urgency"));
                obj.addProperty("justification", rs.getString("justification"));
                obj.addProperty("fecha", rs.getString("fecha"));
                list.add(obj);
            }
        }
        return list;
    }

    private List<JsonObject> listarBitacoras() throws Exception {
        List<JsonObject> list = new ArrayList<>();
        String sql = "SELECT * FROM registros_servicio ORDER BY id DESC LIMIT 50";
        try (Connection cn = Conexion.getConexion();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                JsonObject obj = new JsonObject();
                obj.addProperty("id", rs.getInt("id"));
                obj.addProperty("serviceId", rs.getString("service_id"));
                obj.addProperty("description", rs.getString("description"));
                obj.addProperty("quantity", rs.getInt("quantity"));
                obj.addProperty("cost", rs.getDouble("estimated_cost"));
                obj.addProperty("time", rs.getString("time_invested"));
                obj.addProperty("fecha", rs.getString("fecha"));
                list.add(obj);
            }
        }
        return list;
    }

    private String getStr(JsonObject obj, String key) {
        return obj.has(key) && !obj.get(key).isJsonNull() ? obj.get(key).getAsString() : "";
    }

    private void configureResponse(HttpServletResponse response) {
        response.setContentType("application/json; charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        configureResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
