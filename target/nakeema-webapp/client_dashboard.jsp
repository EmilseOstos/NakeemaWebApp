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
    <title>Nakeema - Client Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="client" active="dashboard"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 d-flex flex-column position-relative">
                
                <nk-topbar role="client" username="Emilse Ostos"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100">
                    
                    <div class="row g-4 mb-4">
                        <div class="col-12">
                            <div class="nk-card p-4 shadow-sm bg-white welcome-card-client">
                                <h4 class="fw-bold mb-2 text-nk-dark">¡Hola, Emilse! 👋</h4>
                                <p class="text-muted mb-0 fs-15">Tienes <strong class="text-warning">1 servicio en proceso</strong> actualmente. Tu solicitud más reciente fue hace 2 días.</p>
                            </div>
                        </div>
                    </div>

                    <div class="nk-card p-4 shadow-sm bg-white rounded-16">
                        <h5 class="fw-bold mb-4 fs-5 border-bottom pb-3 text-nk-primary">Historial Reciente</h5>
                        
                        <div class="d-none d-md-flex text-muted fw-bold mb-2 px-3 pb-2 border-bottom fs-12 text-uppercase">
                            <div class="flex-2">Servicio</div>
                            <div class="flex-1 text-center">Estado</div>
                            <div class="flex-1 text-end">Fecha / Hora</div>
                        </div>

                        <div class="list-group list-group-flush">
                            <div class="list-group-item px-md-3 py-3 d-flex flex-wrap align-items-center gap-3 gap-md-0" style="border-bottom: 1px solid var(--nk-border);">
                                <div class="flex-2 min-w-200 d-flex align-items-center gap-3">
                                    <div class="flex-shrink-0 icon-circle-bg bg-warning-light text-warning">
                                        <i class="bi bi-clock-history"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold fs-6 text-dark line-height-1-2">Mantenimiento Preventivo</div>
                                        <small class="text-muted fw-bold">Instalación solicitada</small>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-120 text-md-center">
                                    <span class="badge bg-warning text-dark rounded-pill px-3 py-2 shadow-sm"><i class="bi bi-clock me-1"></i> Pendiente</span>
                                </div>
                                <div class="flex-1 min-w-120 text-md-end text-muted fs-13 fw-500 ms-md-3">
                                    Hoy, 10:30 am
                                </div>
                            </div>
                            
                            <div class="list-group-item px-md-3 py-3 d-flex flex-wrap align-items-center gap-3 gap-md-0" style="border-bottom: 1px solid var(--nk-border);">
                                <div class="flex-2 min-w-200 d-flex align-items-center gap-3">
                                    <div class="flex-shrink-0 icon-circle-bg bg-success-light text-success">
                                        <i class="bi bi-tools"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold fs-6 text-dark line-height-1-2">Reparación Eléctrica</div>
                                        <small class="text-muted fw-bold">Cambio alternador</small>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-120 text-md-center">
                                    <span class="badge bg-success rounded-pill px-3 py-2 shadow-sm"><i class="bi bi-check-circle me-1"></i> Completado</span>
                                </div>
                                <div class="flex-1 min-w-120 text-md-end text-muted fs-13 fw-500 ms-md-3">
                                    12 Mar 2026
                                </div>
                            </div>

                            <div class="list-group-item px-md-3 py-3 d-flex flex-wrap align-items-center gap-3 gap-md-0 border-0">
                                <div class="flex-2 min-w-200 d-flex align-items-center gap-3">
                                    <div class="flex-shrink-0 icon-circle-bg bg-success-light text-success">
                                        <i class="bi bi-gear-fill"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold fs-6 text-dark line-height-1-2">Revisión General</div>
                                        <small class="text-muted fw-bold">Chequeo 10.000 KM</small>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-120 text-md-center">
                                    <span class="badge bg-success rounded-pill px-3 py-2 shadow-sm"><i class="bi bi-check-circle me-1"></i> Completado</span>
                                </div>
                                <div class="flex-1 min-w-120 text-md-end text-muted fs-13 fw-500 ms-md-3">
                                    05 Ene 2026
                                </div>
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
</body>
</html>
