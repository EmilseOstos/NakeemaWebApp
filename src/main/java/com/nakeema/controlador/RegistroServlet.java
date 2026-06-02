package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/RegistroServlet")
public class RegistroServlet extends HttpServlet {
    
    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String rol = request.getParameter("rol");
        
        System.out.println("[REGISTRO] Nuevo registro: " + username + " | Email: " + email);
        
        boolean registrado = usuarioDAO.registrarUsuario(username, email, password, rol);
        
        if (registrado) {
            System.out.println("[REGISTRO] ✅ Usuario registrado exitosamente");
            response.sendRedirect(request.getContextPath() + "/index.jsp?registro=exitoso");
        } else {
            System.out.println("[REGISTRO] ❌ Error al registrar usuario");
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=registro_fallido");
        }
    }
}