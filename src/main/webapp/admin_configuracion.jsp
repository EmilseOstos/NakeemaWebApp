<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    jakarta.servlet.http.HttpSession miSesion = request.getSession(false);
    String usuarioLogueado = (miSesion != null) ? (String) miSesion.getAttribute("usuarioLogueado") : null;
    String rolUsuario = (miSesion != null) ? (String) miSesion.getAttribute("rolUsuario") : null;

    if (usuarioLogueado == null || !"admin".equals(rolUsuario)) {
        response.sendRedirect(request.getContextPath() + "/index.jsp?error=no_autorizado");
        return;
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Configuración</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="admin" active="configuracion" context="${pageContext.request.contextPath}"></nk-sidebar>

        <main class="main-content">
            <nk-topbar role="admin" username="${usuarioLogueado}"></nk-topbar>

            <div class="px-md-4 py-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold m-0 text-nk-primary fs-24">Configuración del Sistema</h3>
                    <button class="btn btn-success rounded-pill px-4 fw-bold shadow-sm bg-nk-primary border-0" onclick="saveAllConfig()">
                        <i class="bi bi-save me-2"></i> Guardar Cambios
                    </button>
                </div>

                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="nk-card p-4 text-center shadow-sm bg-white tech-card">
                            <input type="file" id="logoUpload" accept="image/png, image/jpeg" style="display: none;" onchange="updateLogo(this)">
                            <div id="logoPreview" class="mx-auto mb-3 logo-preview-box" onclick="document.getElementById('logoUpload').click()">
                                <i class="bi bi-camera fs-2 text-muted" id="logoIcon"></i>
                            </div>
                            <h5 class="fw-bold fs-6">Logo de la Empresa</h5>
                            <p class="text-muted fs-12">Formato PNG o JPG. Max 2MB.</p>
                            <button class="btn btn-outline-success btn-sm rounded-pill px-4 mt-2 fw-bold btn-outline-nk" onclick="document.getElementById('logoUpload').click()">Subir Imagen</button>
                        </div>
                        
                        <div class="nk-card p-4 shadow-sm bg-white mt-4 tech-card">
                            <h5 class="fw-bold fs-6 border-bottom pb-2 mb-3">Estilos</h5>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-muted fs-6 fw-bold"><i class="bi bi-moon-stars-fill me-2"></i>Modo Oscuro</span>
                                <div class="form-check form-switch fs-4 m-0">
                                    <input class="form-check-input" type="checkbox" role="switch" id="darkModeToggle" onchange="toggleDarkMode()">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="nk-card p-4 shadow-sm bg-white tech-card">
                            <h5 class="fw-bold mb-4 fs-5 border-bottom pb-2">Información General</h5>
                            
                            <form id="configForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label text-muted fs-13 fw-600">Nombre de la Empresa</label>
                                        <input type="text" id="cfgCompanyName" class="form-control shadow-none bg-light border-0 py-2 px-3 rounded-3" value="Nakeema Corp" required minlength="3" maxlength="100">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted fs-13 fw-600">Correo de Contacto</label>
                                        <input type="email" id="cfgCompanyEmail" class="form-control shadow-none bg-light border-0 py-2 px-3 rounded-3" value="admin@nakeema.com" required>
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="form-label text-muted fs-13 fw-600">Dirección Principal</label>
                                        <input type="text" id="cfgCompanyAddress" class="form-control shadow-none bg-light border-0 py-2 px-3 rounded-3" value="Calle Falsa 123, Ciudad de México" maxlength="200">
                                    </div>
                                </div>

                                <h5 class="fw-bold mb-3 mt-5 fs-5 border-bottom pb-2">Preferencias del Sistema</h5>
                                
                                <div class="form-check form-switch mb-3 d-flex align-items-center">
                                    <input class="form-check-input fs-5 flex-shrink-0 cursor-pointer mt-0" type="checkbox" id="notifEmail" onchange="savePrefSwitch()">
                                    <label class="form-check-label ms-3 fw-600 cursor-pointer" for="notifEmail">Enviar notificaciones por correo a los técnicos</label>
                                </div>
                                <div class="form-check form-switch mb-3 d-flex align-items-center">
                                    <input class="form-check-input fs-5 flex-shrink-0 cursor-pointer mt-0" type="checkbox" id="notifSMS" onchange="savePrefSwitch()">
                                    <label class="form-check-label ms-3 fw-600 cursor-pointer" for="notifSMS">Habilitar alertas SMS para servicios de alta prioridad</label>
                                </div>
                                <div class="form-check form-switch d-flex align-items-center mt-3">
                                    <input class="form-check-input fs-5 flex-shrink-0 cursor-pointer mt-0" type="checkbox" id="autoAssign" onchange="savePrefSwitch()">
                                    <label class="form-check-label ms-3 fw-600 cursor-pointer" for="autoAssign">Auto-asignar servicios según disponibilidad técnica</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
        </main>
    </div>

    <nk-chat-btn></nk-chat-btn>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        function updateLogo(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('logoPreview').style.backgroundImage = 'url(' + e.target.result + ')';
                    document.getElementById('logoIcon').style.display = 'none';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // Load preferences from localStorage
        document.addEventListener('DOMContentLoaded', function() {
            if (!window.nkStorage) return;
            const prefs = window.nkStorage.getPreferences();
            document.getElementById('darkModeToggle').checked = prefs.darkMode || false;
            document.getElementById('notifEmail').checked = prefs.emailNotifications !== false;
            document.getElementById('notifSMS').checked = prefs.smsAlerts || false;
            document.getElementById('autoAssign').checked = prefs.autoAssign !== false;
            if (prefs.companyName) document.getElementById('cfgCompanyName').value = prefs.companyName;
            if (prefs.companyEmail) document.getElementById('cfgCompanyEmail').value = prefs.companyEmail;
            if (prefs.companyAddress) document.getElementById('cfgCompanyAddress').value = prefs.companyAddress;
        });

        function toggleDarkMode() {
            if (!window.nkStorage) return;
            const isDark = document.getElementById('darkModeToggle').checked;
            window.nkStorage.updatePreferences({ darkMode: isDark });
            window.nkStorage.applyTheme();
            window.nkStorage.showToast(isDark ? 'Modo oscuro activado' : 'Modo claro activado');
        }

        function savePrefSwitch() {
            if (!window.nkStorage) return;
            window.nkStorage.updatePreferences({
                emailNotifications: document.getElementById('notifEmail').checked,
                smsAlerts: document.getElementById('notifSMS').checked,
                autoAssign: document.getElementById('autoAssign').checked
            });
        }

        function validateConfigForm() {
            const name = document.getElementById('cfgCompanyName');
            const email = document.getElementById('cfgCompanyEmail');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let valid = true;

            name.classList.remove('is-invalid');
            email.classList.remove('is-invalid');

            if (!name.value.trim() || name.value.trim().length < 3) {
                name.classList.add('is-invalid');
                name.nextElementSibling.textContent = 'El nombre debe tener al menos 3 caracteres';
                valid = false;
            }
            if (!email.value.trim()) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Email es requerido';
                valid = false;
            } else if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                email.nextElementSibling.textContent = 'Formato de email inválido';
                valid = false;
            }

            return valid;
        }

        function saveAllConfig() {
            if (!validateConfigForm()) return;
            if (!window.nkStorage) return;
            window.nkStorage.updatePreferences({
                companyName: document.getElementById('cfgCompanyName').value,
                companyEmail: document.getElementById('cfgCompanyEmail').value,
                companyAddress: document.getElementById('cfgCompanyAddress').value,
                emailNotifications: document.getElementById('notifEmail').checked,
                smsAlerts: document.getElementById('notifSMS').checked,
                autoAssign: document.getElementById('autoAssign').checked
            });
            window.nkStorage.showToast('Configuración guardada exitosamente');
        }
    </script>
</body>
</html>
