package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import com.nakeema.modelo.Usuario;
import com.nakeema.util.Validator;
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

        String usuario = request.getParameter("identificador");
        String password = request.getParameter("password");

        Validator.ValidationResult userVal = Validator.validateRequired(usuario, "Usuario/Email");
        if (!userVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(userVal.getMessage(), "UTF-8"));
            return;
        }

        Validator.ValidationResult passVal = Validator.validateRequired(password, "Contraseña");
        if (!passVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(passVal.getMessage(), "UTF-8"));
            return;
        }

        Usuario usuarioEncontrado = usuarioDAO.validarLogin(usuario, password);

        if (usuarioEncontrado != null) {
            HttpSession session = request.getSession();
            session.setAttribute("usuarioLogueado", usuarioEncontrado.getUsername());
            session.setAttribute("rolUsuario", usuarioEncontrado.getRol());
            session.setAttribute("idUsuario", usuarioEncontrado.getId());

            String rol = usuarioEncontrado.getRol().toLowerCase();
            switch (rol) {
                case "admin":
                    response.sendRedirect(request.getContextPath() + "/admin_dashboard.jsp");
                    break;
                case "cliente":
                case "client":
                case "usuario":
                    response.sendRedirect(request.getContextPath() + "/client_dashboard.jsp");
                    break;
                case "tecnico":
                case "tech":
                    response.sendRedirect(request.getContextPath() + "/tech_consultar.jsp");
                    break;
                default:
                    response.sendRedirect(request.getContextPath() + "/index.jsp");
            }
        } else {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode("Credenciales incorrectas. Verifique sus datos.", "UTF-8"));
        }
    }
}
