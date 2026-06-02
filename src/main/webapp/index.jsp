<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Iniciar Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="login-container">
        <div class="login-card">
            <div class="login-logo">
                <img src="img/logo.png" alt="Nakeema Logo" class="nk-img-contain-lg">
            </div>

            <!-- LOGIN SECTION -->
            <div id="loginSection">
                <form id="loginForm" action="${pageContext.request.contextPath}/LoginServlet" method="POST">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-fill"></i>
                        <input type="text" name="identificador" class="form-control" placeholder="Usuario/email" value="admin" required>
                    </div>

                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" name="password" class="form-control pe-5" id="loginPass" placeholder="Contraseña" value="123456" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('loginPass', this)"></span>
                    </div>

                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge-fill"></i>
                        <select id="userRole" name="rol" class="form-select text-muted" required>
                            <option value="admin" selected>Administrador</option>
                            <option value="client">Cliente (Usuario Final)</option>
                            <option value="tech">Soporte Técnico</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-nakeema mt-3 w-100">Iniciar Sesión</button>
                </form>

                <div class="login-links mt-4">
                    <a href="#" onclick="toggleAuthSection('forgotSection')">Olvidé mi contraseña</a>
                    <a href="#" onclick="toggleAuthSection('registerSection')">Registrarse por primera vez</a>
                </div>
            </div>

            <!-- REGISTER FORM -->
            <div id="registerSection" style="display: none;">
                <h5 class="mb-4 fw-bold text-muted">Crear Nueva Cuenta</h5>
                <form id="registerForm" action="${pageContext.request.contextPath}/RegistroServlet" method="POST">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge"></i>
                        <input type="text" name="username" class="form-control" placeholder="Nombre de Usuario" required>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" name="email" class="form-control" placeholder="Correo Electrónico" required>
                    </div>
                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" name="password" class="form-control pe-5" id="registerPass" placeholder="Crear Contraseña" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('registerPass', this)"></span>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-shield-lock-fill"></i>
                        <select name="rol" class="form-select text-muted" required>
                            <option value="cliente" selected>Cliente</option>
                            <option value="tecnico">Técnico/Soporte</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-nakeema mt-2">Completar Registro</button>
                </form>
                <div class="login-links mt-4">
                    <a href="#" onclick="toggleAuthSection('loginSection')" class="text-secondary fw-medium"><i class="bi bi-arrow-left"></i> Volver a <b>Iniciar Sesión</b></a>
                </div>
            </div>

            <!-- FORGOT PASSWORD FORM -->
            <div id="forgotSection" style="display: none;">
                <h5 class="mb-3 fw-bold text-muted">Recuperar Contraseña</h5>
                <p class="text-muted mb-4 fs-13">Ingresa el correo asociado a tu cuenta para enviarte un enlace de recuperación.</p>
                <!-- IMPORTANTE: Cambia la acción a tu servlet de recuperación -->
                <form id="forgotForm" action="${pageContext.request.contextPath}/RecuperarPasswordServlet" method="POST">
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" name="email" class="form-control" placeholder="Tu Correo Electrónico" required>
                    </div>
                    <button type="submit" class="btn btn-nakeema mt-2">Enviar Enlace</button>
                </form>
                <div class="login-links mt-4">
                    <a href="#" onclick="toggleAuthSection('loginSection')" class="text-secondary fw-medium"><i class="bi bi-arrow-left"></i> Volver a <b>Iniciar Sesión</b></a>
                </div>
            </div>

            <!-- SUCCESS SECTION -->
            <div id="successSection" style="display: none; text-align: center; padding: 20px 0;">
                <div class="mb-4 authentication-success-check" style="background: green; display: inline-block; padding: 10px; border-radius: 50%;">
                    <i class="bi bi-check-lg" style="color: white; font-size: 40px;"></i>
                </div>
                <h3 class="fw-bold mb-3 text-nk-main">¡Registro Exitoso!</h3>
                <p class="text-muted mb-4">Por favor, revisa tu correo electrónico para verificar tu cuenta.</p>
                <button type="button" class="btn btn-nakeema mt-2" onclick="toggleAuthSection('loginSection')">Ir al Inicio</button>
            </div>
        </div>
    </div>
    <script type="module" src="js/main.js"></script>
</body>
>>>>>>> df49eca10a177a235459f59339744f707965389c
</html>