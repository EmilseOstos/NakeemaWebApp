package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import com.nakeema.util.Validator;
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

        String username = Validator.sanitize(request.getParameter("username"));
        String email = Validator.sanitize(request.getParameter("email"));
        String password = request.getParameter("password");
        String rol = request.getParameter("rol");

        Validator.ValidationResult userVal = Validator.validateUsername(username);
        if (!userVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(userVal.getMessage(), "UTF-8") + "&form=register");
            return;
        }

        Validator.ValidationResult emailVal = Validator.validateEmail(email);
        if (!emailVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(emailVal.getMessage(), "UTF-8") + "&form=register");
            return;
        }

        Validator.ValidationResult passVal = Validator.validatePassword(password);
        if (!passVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(passVal.getMessage(), "UTF-8") + "&form=register");
            return;
        }

        Validator.ValidationResult rolVal = Validator.validateRol(rol);
        if (!rolVal.isValid()) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode(rolVal.getMessage(), "UTF-8") + "&form=register");
            return;
        }

        boolean registrado = usuarioDAO.registrarUsuario(username, email, password, rol);

        if (registrado) {
            response.sendRedirect(request.getContextPath() + "/index.jsp?registro=exitoso");
        } else {
            response.sendRedirect(request.getContextPath() + "/index.jsp?error=" + java.net.URLEncoder.encode("Error al registrar. El usuario o email ya existe.", "UTF-8") + "&form=register");
        }
    }
}
