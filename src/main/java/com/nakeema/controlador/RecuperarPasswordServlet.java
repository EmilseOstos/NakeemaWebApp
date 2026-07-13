package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import com.nakeema.modelo.Usuario;
import com.nakeema.util.Validator;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/RecuperarPasswordServlet")
public class RecuperarPasswordServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String email = Validator.sanitize(request.getParameter("email"));

        Validator.ValidationResult emailVal = Validator.validateRequired(email, "Correo Electrónico");
        if (!emailVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(emailVal.getMessage(), "UTF-8") + "&form=forgot");
            return;
        }

        Validator.ValidationResult emailFormat = Validator.validateEmail(email);
        if (!emailFormat.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(emailFormat.getMessage(), "UTF-8") + "&form=forgot");
            return;
        }

        Usuario usuario = usuarioDAO.buscarPorEmail(email);

        if (usuario != null) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?recuperacion=exitoso&email=" + java.net.URLEncoder.encode(email, "UTF-8"));
        } else {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode("No se encontró ninguna cuenta con ese correo electrónico.", "UTF-8") + "&form=forgot");
        }
    }
}
