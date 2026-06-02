<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    jakarta.servlet.http.HttpSession miSesion = request.getSession(false);
    String usuarioLogueado = (miSesion != null) ? (String) miSesion.getAttribute("usuarioLogueado") : null;
    String rolUsuario = (miSesion != null) ? (String) miSesion.getAttribute("rolUsuario") : null;

    if (usuarioLogueado == null || !"client".equals(rolUsuario)) {
        response.sendRedirect(request.getContextPath() + "/index.jsp?error=no_autorizado");
        return;
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Mi Perfil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="client" active="perfil"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 d-flex flex-column position-relative">
                
                <nk-topbar role="client" username="Emilse Ostos"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Mi Perfil</h3>
                    
                    <div class="row g-4">
                        <div class="col-lg-4">
                            <div class="nk-card p-4 text-center bg-white shadow-sm rounded-16">
                                <input type="file" id="avatarUpload" accept="image/*" style="display: none;" onchange="updateAvatar(this)">
                                <div id="avatarPreview" class="avatar mx-auto mb-3 shadow-sm border border-4 border-light position-relative bg-nk-primary avatar-profile-xl">
                                    <i class="bi bi-person fs-1 fs-custom-50-important" id="avatarIcon"></i>
                                    <button type="button" class="btn btn-light rounded-circle position-absolute bottom-0 end-0 shadow-sm p-1 btn-camera-float" onclick="document.getElementById('avatarUpload').click()"><i class="bi bi-camera-fill text-muted"></i></button>
                                </div>
                                <h4 class="fw-bold mb-1" id="profileNameDisplay">Emilse Ostos</h4>
                                <p class="text-success fw-bold mb-3 fs-13">Cliente Premium <i class="bi bi-patch-check-fill ms-1"></i></p>
                                
                                <div class="border-top pt-3 text-start">
                                    <div class="d-flex align-items-center mb-2 text-muted fs-13" id="profileEmailDisplay">
                                        <i class="bi bi-envelope-fill me-2 fs-5 w-25 text-nk-primary"></i> emilse.ostos@gmail.com
                                    </div>
                                    <div class="d-flex align-items-center mb-2 text-muted fs-13" id="profilePhoneDisplay">
                                        <i class="bi bi-telephone-fill me-2 fs-5 w-25 text-nk-primary"></i> +57 320 123 4567
                                    </div>
                                    <div class="d-flex align-items-center mb-2 text-muted fs-13">
                                        <i class="bi bi-geo-alt-fill me-2 fs-5 w-25 text-nk-primary"></i> Bogotá, Colombia
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-8">
                            <div class="nk-card p-4 p-md-5 bg-white shadow-sm h-100 rounded-16">
                                <h5 class="fw-bold mb-4 fs-5 border-bottom pb-3">Actualizar Datos Personales</h5>
                                
                                <form id="profileForm" onsubmit="saveProfile(event)">
                                    <div class="row g-4">
                                        <div class="col-md-6">
                                            <label class="form-label text-muted fw-bold fs-13">Nombre Completo</label>
                                            <input type="text" id="profName" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" value="Emilse Ostos">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label text-muted fw-bold fs-13">Documento de Identidad</label>
                                            <input type="text" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3 text-muted" value="CC 1.020.345.678" disabled>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label text-muted fw-bold fs-13">Correo Electrónico</label>
                                            <input type="email" id="profEmail" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" value="emilse.ostos@gmail.com">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label text-muted fw-bold fs-13">Teléfono Móvil</label>
                                            <input type="tel" id="profPhone" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" value="+57 320 123 4567">
                                        </div>
                                        <div class="col-12 mt-5 d-flex justify-content-center border-top pt-4">
                                            <button type="submit" class="btn btn-success rounded-pill fw-bold shadow-sm bg-nk-primary border-0 btn-form-action">
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
            </div>
        </main>
    </div>

    <nk-chat-btn></nk-chat-btn>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        function updateAvatar(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('avatarPreview').style.backgroundImage = 'url(' + e.target.result + ')';
                    document.getElementById('avatarIcon').style.display = 'none';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // Load profile from storage
        document.addEventListener('DOMContentLoaded', function() {
            if (window.nkStorage) {
                const p = window.nkStorage.getProfile();
                if (p.name) {
                    document.getElementById('profName').value = p.name;
                    document.getElementById('profEmail').value = p.email || '';
                    document.getElementById('profPhone').value = p.phone || '';
                    document.getElementById('profileNameDisplay').textContent = p.name;
                    document.getElementById('profileEmailDisplay').innerHTML = '<i class="bi bi-envelope-fill me-2 fs-5 w-25 text-nk-primary"></i> ' + (p.email || '');
                    document.getElementById('profilePhoneDisplay').innerHTML = '<i class="bi bi-telephone-fill me-2 fs-5 w-25 text-nk-primary"></i> ' + (p.phone || '');
                }
            }
        });

        function saveProfile(e) {
            e.preventDefault();
            if (!window.nkStorage) return;
            window.nkStorage.updateProfile({
                name: document.getElementById('profName').value,
                email: document.getElementById('profEmail').value,
                phone: document.getElementById('profPhone').value
            });
            window.nkStorage.showToast('Perfil actualizado exitosamente');
            // Update sidebar display
            document.getElementById('profileNameDisplay').textContent = document.getElementById('profName').value;
            document.getElementById('profileEmailDisplay').innerHTML = '<i class="bi bi-envelope-fill me-2 fs-5 w-25 text-nk-primary"></i> ' + document.getElementById('profEmail').value;
            document.getElementById('profilePhoneDisplay').innerHTML = '<i class="bi bi-telephone-fill me-2 fs-5 w-25 text-nk-primary"></i> ' + document.getElementById('profPhone').value;
        }
    </script>
</body>
</html>
