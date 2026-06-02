package com.nakeema.controlador;

import com.nakeema.dao.UsuarioDAO;
import com.nakeema.modelo.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/TestServlet")
public class TestServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html; charset=UTF-8");
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head><title>Prueba CRUD - Nakeema</title></head>");
            out.println("<body style='font-family: Arial, sans-serif; margin: 30px;'>");
            out.println("<h1>🚀 Ejecutando Pruebas de Persistencia Integral (CRUD)</h1>");
            out.println("<p><strong>Nota:</strong> Revisa la consola/terminal de tu IDE para ver el detalle de las consultas SQL.</p>");
            out.println("<hr>");

            // Imprimir inicio en la consola de VS Code
            System.out.println("\n==================================================");
            System.out.println("🏁 INICIANDO CICLO DE PRUEBAS DEL CRUD DE USUARIOS");
            System.out.println("==================================================");

            // -----------------------------------------------------------------
            // 1. C - CREATE: Insertar un usuario de prueba
            // -----------------------------------------------------------------
            System.out.println("\n[PASO 1] -> Ejecutando Inserción (INSERT)...");
            String userPrueba = "tester_sena";
            String emailPrueba = "tester@nakeema.com";
            String passPrueba = "sena2026";
            String rolPrueba = "cliente";

            boolean insertado = usuarioDAO.registrarUsuario(userPrueba, emailPrueba, passPrueba, rolPrueba);
            
            if (insertado) {
                System.out.println("✅ ÉXITO: Usuario registrado en la base de datos.");
                out.println("<p style='color: green;'><strong>[CREATE] ✅ Paso 1 exitoso:</strong> Usuario '" + userPrueba + "' creado en la BD.</p>");
            } else {
                System.out.println("❌ ERROR: No se pudo insertar el registro.");
                out.println("<p style='color: red;'><strong>[CREATE] ❌ Paso 1 fallido:</strong> Error al insertar.</p>");
                return; // Frenamos la ejecución si falla el primer paso
            }

            // -----------------------------------------------------------------
            // 2. R - READ: Consultar el usuario (Simular Login)
            // -----------------------------------------------------------------
            System.out.println("\n[PASO 2] -> Ejecutando Consulta (SELECT)...");
            Usuario usuarioRecuperado = usuarioDAO.validarLogin(userPrueba, passPrueba);
            
            if (usuarioRecuperado != null) {
                System.out.println("✅ ÉXITO: Usuario encontrado. ID asignado: " + usuarioRecuperado.getId());
                out.println("<p style='color: green;'><strong>[READ] ✅ Paso 2 exitoso:</strong> Login simulado correcto. ID obtenido: " + usuarioRecuperado.getId() + "</p>");
            } else {
                System.out.println("❌ ERROR: No se encontró el registro con esas credenciales.");
                out.println("<p style='color: red;'><strong>[READ] ❌ Paso 2 fallido:</strong> No se recuperaron datos.</p>");
                return;
            }

            // -----------------------------------------------------------------
            // 3. U - UPDATE: Modificar datos del usuario obtenido
            // -----------------------------------------------------------------
            System.out.println("\n[PASO 3] -> Ejecutando Actualización (UPDATE)...");
            // Le cambiamos el rol y la contraseña al objeto que trajimos de la BD
            usuarioRecuperado.setRol("admin");
            usuarioRecuperado.setPassword("claveModificada123");
            
            boolean actualizado = usuarioDAO.actualizarUsuario(usuarioRecuperado);
            
            if (actualizado) {
                // Verificamos volviendo a consultar por ID
                Usuario usuarioVerificado = usuarioDAO.obtenerPorId(usuarioRecuperado.getId());
                System.out.println("✅ ÉXITO: Datos actualizados. Nuevo rol verificado: " + usuarioVerificado.getRol());
                out.println("<p style='color: green;'><strong>[UPDATE] ✅ Paso 3 exitoso:</strong> Usuario modificado. Nuevo Rol en BD: " + usuarioVerificado.getRol() + "</p>");
            } else {
                System.out.println("❌ ERROR: No se pudo actualizar el registro.");
                out.println("<p style='color: red;'><strong>[UPDATE] ❌ Paso 3 fallido:</strong> Error al actualizar.</p>");
            }

            // -----------------------------------------------------------------
            // 4. D - DELETE: Eliminar el registro para limpiar la BD
            // -----------------------------------------------------------------
            System.out.println("\n[PASO 4] -> Ejecutando Eliminación (DELETE)...");
            boolean eliminado = usuarioDAO.eliminarUsuario(usuarioRecuperado.getId());
            
            if (eliminado) {
                System.out.println("✅ ÉXITO: Registro de prueba eliminado de forma persistente.");
                out.println("<p style='color: green;'><strong>[DELETE] ✅ Paso 4 exitoso:</strong> Registro eliminado correctamente. BD limpia.</p>");
            } else {
                System.out.println("❌ ERROR: No se pudo eliminar el registro.");
                out.println("<p style='color: red;'><strong>[DELETE] ❌ Paso 4 fallido:</strong> Error al eliminar de la BD.</p>");
            }

            System.out.println("\n==================================================");
            System.out.println("🎉 CICLO DE PRUEBAS INTEGRAL FINALIZADO CON ÉXITO");
            System.out.println("==================================================");
            
            out.println("<br><h2>🏁 ¡Prueba del Ciclo CRUD completada con éxito al 100%!</h2>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}