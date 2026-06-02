
package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import com.nakeema.modelo.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        
        // Capturar datos del formulario
        String usuario = request.getParameter("identificador");
        String password = request.getParameter("password");
        
        System.out.println("\n[LOGIN] ========================================");
        System.out.println("[LOGIN] Usuario/Email: " + usuario);
        System.out.println("[LOGIN] Password: " + password);
        
        // Validar con DAO
        Usuario usuarioEncontrado = usuarioDAO.validarLogin(usuario, password);
        
        if (usuarioEncontrado != null) {
            System.out.println("[LOGIN] ✅ LOGIN EXITOSO - Rol: " + usuarioEncontrado.getRol());
            System.out.println("[LOGIN] ========================================\n");
            
            // Guardar en sesión
            HttpSession session = request.getSession();
            session.setAttribute("usuarioLogueado", usuarioEncontrado.getUsername());
            session.setAttribute("rolUsuario", usuarioEncontrado.getRol());
            session.setAttribute("idUsuario", usuarioEncontrado.getId());
            
            // Redirigir según rol
            String rol = usuarioEncontrado.getRol().toLowerCase();
            if (rol.equals("admin")) {
                response.sendRedirect(request.getContextPath() + "/admin_dashboard.jsp");
            } else if (rol.equals("cliente") || rol.equals("usuario")) {
                response.sendRedirect(request.getContextPath() + "/client_dashboard.jsp");
            } else if (rol.equals("tecnico")) {
                response.sendRedirect(request.getContextPath() + "/tech_consultar.jsp");
            } else {
                response.sendRedirect(request.getContextPath() + "/index.jsp");
            }
        } else {
            System.out.println("[LOGIN] ❌ LOGIN FALLIDO - Credenciales incorrectas");
            System.out.println("[LOGIN] ========================================\n");
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=no_autorizado");
        }
    }
}