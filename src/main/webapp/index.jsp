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

            <div id="loginError" class="alert alert-danger py-2 px-3 fs-13 d-none text-center" role="alert"></div>

            <!-- LOGIN SECTION -->
            <div id="loginSection">
                <form id="loginForm" action="${pageContext.request.contextPath}/LoginServlet" method="POST" onsubmit="return validateLoginForm()">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-fill"></i>
                        <input type="text" id="loginIdentificador" name="identificador" class="form-control" placeholder="Usuario o correo electrónico" required>
                        <div class="invalid-feedback"></div>
                    </div>

                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" name="password" class="form-control pe-5" id="loginPass" placeholder="Contraseña" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('loginPass', this)"></span>
                        <div class="invalid-feedback"></div>
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
                <div id="registerError" class="alert alert-danger py-2 px-3 fs-13 d-none text-center" role="alert"></div>
                <form id="registerForm" action="${pageContext.request.contextPath}/RegistroServlet" method="POST" onsubmit="return validateRegisterForm()">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge"></i>
                        <input type="text" id="regUsername" name="username" class="form-control" placeholder="Nombre de Usuario (mín. 3 caracteres)" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" id="regEmail" name="email" class="form-control" placeholder="Correo Electrónico" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" name="password" class="form-control pe-5" id="registerPass" placeholder="Crear Contraseña (mín. 6 caracteres)" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('registerPass', this)"></span>
                        <div class="invalid-feedback"></div>
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
                <div id="forgotError" class="alert alert-danger py-2 px-3 fs-13 d-none text-center" role="alert"></div>
                <form id="forgotForm" action="${pageContext.request.contextPath}/RecuperarPasswordServlet" method="POST" onsubmit="return validateForgotForm()">
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" id="forgotEmail" name="email" class="form-control" placeholder="Tu Correo Electrónico" required>
                        <div class="invalid-feedback"></div>
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
    <script>
        function validateLoginForm() {
            const user = document.getElementById('loginIdentificador');
            const pass = document.getElementById('loginPass');
            let valid = true;

            if (!user.value.trim()) {
                user.classList.add('is-invalid');
                user.nextElementSibling.textContent = 'Usuario/Email es requerido';
                valid = false;
            } else {
                user.classList.remove('is-invalid');
            }

            if (!pass.value.trim()) {
                pass.classList.add('is-invalid');
                pass.nextElementSibling.textContent = 'Contraseña es requerida';
                valid = false;
            } else if (pass.value.length < 6) {
                pass.classList.add('is-invalid');
                pass.nextElementSibling.textContent = 'La contraseña debe tener al menos 6 caracteres';
                valid = false;
            } else {
                pass.classList.remove('is-invalid');
            }

            return valid;
        }

        function validateForgotForm() {
            const email = document.getElementById('forgotEmail');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let valid = true;

            if (!email.value.trim()) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Correo electrónico es requerido';
                valid = false;
            } else if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Formato de email inválido';
                valid = false;
            } else {
                email.classList.remove('is-invalid');
            }

            return valid;
        }

        function validateRegisterForm() {
            const username = document.getElementById('regUsername');
            const email = document.getElementById('regEmail');
            const pass = document.getElementById('registerPass');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let valid = true;

            if (!username.value.trim()) {
                username.classList.add('is-invalid');
                username.nextElementSibling.textContent = 'Nombre de usuario es requerido';
                valid = false;
            } else if (username.value.trim().length < 3) {
                username.classList.add('is-invalid');
                username.nextElementSibling.textContent = 'Debe tener al menos 3 caracteres';
                valid = false;
            } else if (/[<>"';()&%]/.test(username.value)) {
                username.classList.add('is-invalid');
                username.nextElementSibling.textContent = 'Caracteres no permitidos';
                valid = false;
            } else {
                username.classList.remove('is-invalid');
            }

            if (!email.value.trim()) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Email es requerido';
                valid = false;
            } else if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Formato de email inválido';
                valid = false;
            } else {
                email.classList.remove('is-invalid');
            }

            if (!pass.value.trim()) {
                pass.classList.add('is-invalid');
                pass.nextElementSibling.textContent = 'Contraseña es requerida';
                valid = false;
            } else if (pass.value.length < 6) {
                pass.classList.add('is-invalid');
                pass.nextElementSibling.textContent = 'Debe tener al menos 6 caracteres';
                valid = false;
            } else {
                pass.classList.remove('is-invalid');
            }

            return valid;
        }
    </script>
</body>
</html>