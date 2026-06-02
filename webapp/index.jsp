<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Iniciar Sesión</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="login-container">
        <div class="login-card">
            
            <div class="login-logo">
                <img src="img/logo.png" alt="Nakeema Logo" class="nk-img-contain-lg">
            </div>

            <div id="loginSection">
                <form id="loginForm">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-fill"></i>
                        <input type="text" class="form-control" placeholder="Usuario/email" value="usuario@demo.com" required>
                    </div>
                    
                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" class="form-control pe-5" id="loginPass" placeholder="Contraseña" value="123456" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('loginPass', this)"></span>
                    </div>

                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge-fill"></i>
                        <select id="userRole" class="form-select text-muted" required>
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
                <form id="registerForm" onsubmit="event.preventDefault(); toggleAuthSection('successSection');">
                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge"></i>
                        <input type="text" class="form-control" placeholder="Nombre Completo" required>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" class="form-control" placeholder="Correo Electrónico" required>
                    </div>
                    <div class="form-floating-custom position-relative">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" class="form-control pe-5" id="registerPass" placeholder="Crear Contraseña" required>
                        <span class="bi bi-eye-slash-fill password-toggle-icon fs-nk-muted" onclick="togglePassword('registerPass', this)"></span>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-shield-lock-fill"></i>
                        <select class="form-select text-muted" required>
                            <option value="" disabled selected>Seleccione Rol de Registro</option>
                            <option value="client">Cliente</option>
                            <option value="tech">Técnico/Soporte</option>
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
                <p class="text-muted mb-4 fs-13">Ingresa el correo asociado a tu cuenta y el rol para enviarte un enlace de recuperación.</p>
                <form id="forgotForm" onsubmit="event.preventDefault(); alert('Enlace de recuperación enviado al correo.'); toggleAuthSection('loginSection');">
                    <div class="form-floating-custom">
                        <i class="bi bi-envelope-fill"></i>
                        <input type="email" class="form-control" placeholder="Tu Correo Electrónico" required>
                    </div>
                    <div class="form-floating-custom">
                        <i class="bi bi-person-badge-fill"></i>
                        <select class="form-select text-muted" required>
                            <option value="" disabled selected>Seleccione su Rol</option>
                            <option value="admin">Administrador</option>
                            <option value="client">Cliente</option>
                            <option value="tech">Técnico</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-nakeema mt-2">Enviar Enlace</button>
                </form>
                <div class="login-links mt-4">
                    <a href="#" onclick="toggleAuthSection('loginSection')" class="text-secondary fw-medium"><i class="bi bi-arrow-left"></i> Volver a <b>Iniciar Sesión</b></a>
                </div>
            </div>

            <!-- SUCCESS FORM -->
            <div id="successSection" style="display: none; text-align: center; padding: 20px 0;">
                <div class="mb-4 authentication-success-check">
                    <i class="bi bi-check-lg" style="color: white; font-size: 40px;"></i>
                </div>
                <h3 class="fw-bold mb-3 text-nk-main">¡Registro Exitoso!</h3>
                <p class="text-muted mb-2 fs-15">Tu cuenta ha sido creada correctamente. Ya puedes acceder a todas nuestras funciones.</p>
                <p class="mb-4 fw-medium text-nk-primary fs-14">Por favor, revisa tu correo electrónico para verificar tu cuenta.</p>
                <button type="button" class="btn btn-nakeema mt-2" onclick="toggleAuthSection('loginSection')">Ir al Inicio</button>
            </div>

        </div>

        <div class="copyright">
            2026 Todos los derechos Reservados. Nakeema
        </div>
    </div>

    <!-- Floating Chat Button -->
    <nk-chat-btn></nk-chat-btn>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        function toggleAuthSection(sectionId) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('registerSection').style.display = 'none';
            document.getElementById('forgotSection').style.display = 'none';
            document.getElementById('successSection').style.display = 'none';
            document.getElementById(sectionId).style.display = 'block';
        }

        function togglePassword(inputId, iconElement) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                iconElement.classList.remove('bi-eye-slash-fill');
                iconElement.classList.add('bi-eye-fill');
            } else {
                input.type = 'password';
                iconElement.classList.remove('bi-eye-fill');
                iconElement.classList.add('bi-eye-slash-fill');
            }
        }
    </script>
</body>
</html>
