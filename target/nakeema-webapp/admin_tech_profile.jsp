<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
    <title>Nakeema - Perfil Técnico</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <!-- Sidebar -->
        <nk-sidebar role="admin" active="tecnicos"></nk-sidebar>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Topbar -->
            <header class="topbar ps-3">
                <div class="d-flex align-items-center gap-3">
                    <a href="admin_tecnicos.jsp" class="btn btn-light rounded-circle text-muted shadow-sm btn-back-circle">
                        <i class="bi bi-arrow-left fs-5"></i>
                    </a>
                    <h3 class="fw-bold m-0 text-nk-primary fs-22">Perfil del Técnico</h3>
                </div>
                
                <div class="d-flex align-items-center gap-4 pe-3">
                    <div class="position-relative dropstart cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-bell-fill fs-5 text-nk-muted"></i>
                    </div>
                    <div class="user-profile m-0">
                        <div class="user-info">
                            <div class="user-name">Administrador</div>
                        </div>
                        <div class="avatar">
                            <i class="bi bi-person-fill"></i>
                        </div>
                    </div>
                </div>
            </header>

            <div class="px-md-4 py-4 flex-grow-1">
                <div class="row g-4 d-flex align-items-start">
                    
                    <!-- Left Column: Technician Profile -->
                    <div class="col-md-5 col-lg-4">
                        <div class="nk-card p-4 shadow-sm text-center position-relative bg-white rounded-16">
                            <div class="avatar mx-auto mb-3 shadow-sm border border-2 border-white bg-nk-primary avatar-profile-large">
                                <i class="bi bi-person-bounding-box fs-custom-3rem"></i>
                            </div>
                            <h4 class="fw-bold mb-1" id="profileName">Carlos Roa</h4>
                            <p class="text-muted mb-3 fs-14" id="profileSpec">Especialista Eléctrico</p>
                            
                            <span id="profileStatus" class="badge rounded-pill text-bg-success px-4 py-2 fs-6 mb-4 shadow-sm">Disponible</span>
                            
                            <div class="text-start mt-2 px-2">
                                <p class="mb-3 fs-14" id="profilePhone"><i class="bi bi-telephone-fill me-2 text-muted fs-5"></i> +57 320 123 4567</p>
                                <p class="mb-3 fs-14" id="profileEmail"><i class="bi bi-envelope-fill me-2 text-muted fs-5"></i> carlos.roa@nakeema.com</p>
                                <p class="mb-4 fs-14"><i class="bi bi-calendar-check-fill me-2 text-muted fs-5"></i> Ingreso: 12 Feb 2024</p>
                                <hr class="border-nk-border">
                                <div class="d-flex justify-content-between p-3 rounded mt-4 shadow-sm stat-box-light">
                                    <div class="text-center w-50">
                                        <h3 class="fw-bold mb-0 text-nk-primary"><i class="bi bi-star-fill text-warning fs-4"></i> <span id="profileRating">4.8</span></h3>
                                        <small class="text-muted fs-12 fw-600">Calificación</small>
                                    </div>
                                    <div class="text-center border-start ps-3 w-50">
                                        <h3 class="fw-bold text-dark mb-0" id="profileServ">124</h3>
                                        <small class="text-muted fs-12 fw-600">Servicios Completados</small>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-4 pt-3 border-top d-flex gap-2 w-100">
                                <button class="btn btn-outline-success flex-fill rounded-pill fw-bold btn-outline-nk">Modificar</button>
                                <button class="btn btn-outline-danger flex-fill rounded-pill fw-bold">Inhabilitar</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Services & Activity -->
                    <div class="col-md-7 col-lg-8">
                        <div class="nk-card p-4 shadow-sm bg-white h-100 rounded-16">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="fw-bold m-0 text-nk-primary fs-18">Historial de Servicios Asignados</h5>
                                <div class="input-group w-auto search-input-group border-1 border-nk-border">
                                    <span class="input-group-text bg-white border-0"><i class="bi bi-search text-muted"></i></span>
                                    <input type="text" class="form-control border-0 shadow-none" placeholder="Buscar...">
                                </div>
                            </div>
                            
                            <div class="list-group list-group-flush mt-2">
                                <div class="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fw-bold fs-6 mb-1 text-dark">Mantenimiento Preventivo <span class="badge text-bg-warning ms-2 rounded-pill shadow-sm">En proceso</span></div>
                                        <small class="text-muted"><i class="bi bi-ticket-fill text-secondary"></i> #O.R.24568 • <i class="bi bi-person-fill text-secondary"></i> Marcos Suarez • Hoy, 10:00 am</small>
                                    </div>
                                    <button class="btn btn-light text-primary rounded-circle shadow-sm btn-action-circle"><i class="bi bi-eye"></i></button>
                                </div>
                                
                                <div class="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fw-bold fs-6 mb-1 text-dark">Reparación Eléctrica <span class="badge text-bg-success ms-2 rounded-pill shadow-sm">Finalizado</span></div>
                                        <small class="text-muted"><i class="bi bi-ticket-fill text-secondary"></i> #O.R.24501 • <i class="bi bi-person-fill text-secondary"></i> Juan Pérez • 26 Mar 2026</small>
                                    </div>
                                    <button class="btn btn-light text-primary rounded-circle shadow-sm btn-action-circle"><i class="bi bi-eye"></i></button>
                                </div>
                                
                                <div class="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fw-bold fs-6 mb-1 text-dark">Mantenimiento Preventivo <span class="badge text-bg-success ms-2 rounded-pill shadow-sm">Finalizado</span></div>
                                        <small class="text-muted"><i class="bi bi-ticket-fill text-secondary"></i> #O.R.24490 • <i class="bi bi-person-fill text-secondary"></i> Luis Muñoz • 25 Mar 2026</small>
                                    </div>
                                    <button class="btn btn-light text-primary rounded-circle shadow-sm btn-action-circle"><i class="bi bi-eye"></i></button>
                                </div>
                                
                                <div class="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fw-bold fs-6 mb-1 text-dark">Revisión de Seguridad <span class="badge text-bg-danger ms-2 rounded-pill shadow-sm">Cancelado</span></div>
                                        <small class="text-muted"><i class="bi bi-ticket-fill text-secondary"></i> #O.R.24450 • <i class="bi bi-person-fill text-secondary"></i> Maria Gómez • 20 Mar 2026</small>
                                    </div>
                                    <button class="btn btn-light text-primary rounded-circle shadow-sm btn-action-circle"><i class="bi bi-eye"></i></button>
                                </div>
                            </div>
                            
                            <div class="text-center mt-4">
                                <button class="btn btn-outline-success px-4 rounded-pill fw-bold border-2 btn-outline-nk">Ver más historial</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-3 text-muted fw-600 fs-12 pb-3">
                &copy; 2026 Todos los derechos Reservados. Nakeema
            </div>
        </main>
    </div>

    <!-- Floating Chat Button -->
    <a href="support_chat.jsp" class="floating-chat-btn text-decoration-none">
        <i class="bi bi-chat-dots-fill"></i>
    </a>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('name')) {
                const name = urlParams.get('name');
                const spec = urlParams.get('spec');
                const status = urlParams.get('status');
                const rating = urlParams.get('rating');
                const serv = urlParams.get('serv');
                
                document.getElementById('profileName').textContent = name;
                document.getElementById('profileSpec').textContent = spec;
                
                const statusBadge = document.getElementById('profileStatus');
                statusBadge.textContent = status;
                if(status === 'Ocupado') statusBadge.className = 'badge rounded-pill text-bg-warning px-4 py-2 fs-6 mb-4 shadow-sm';
                else if(status === 'Inactivo') statusBadge.className = 'badge rounded-pill text-bg-danger px-4 py-2 fs-6 mb-4 shadow-sm';
                else statusBadge.className = 'badge rounded-pill text-bg-success px-4 py-2 fs-6 mb-4 shadow-sm';
                
                document.getElementById('profileRating').textContent = rating;
                document.getElementById('profileServ').textContent = serv;
                
                // Generar un número y email aleatorios para el demo basados en el nombre
                const phoneSeed = name.length * 12345;
                document.getElementById('profilePhone').innerHTML = `<i class="bi bi-telephone-fill me-2 text-muted fs-5"></i> +57 320 ${String(phoneSeed).substr(0,3)} ${String(phoneSeed*2).substr(0,4)}`;
                
                const email = name.toLowerCase().split(' ').join('.') + '@nakeema.com';
                document.getElementById('profileEmail').innerHTML = `<i class="bi bi-envelope-fill me-2 text-muted fs-5"></i> ${email}`;
            }
        });
    </script>
</body>
</html>
