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
    <title>Nakeema - Servicios Activos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="client" active="consultar" context="${pageContext.request.contextPath}"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 d-flex flex-column position-relative">
                
                <nk-topbar role="client" username="Emilse Ostos"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Mis Solicitudes de Servicio</h3>
                    
                    <div class="nk-card p-0 shadow-sm overflow-hidden bg-white rounded-16">
                        <div class="table-responsive">
                            <table class="table-custom mb-0 text-center align-middle w-100">
                                <thead class="bg-header-light">
                                    <tr>
                                        <th class="py-3 px-3">ID Servicio</th>
                                        <th>Tipo de Servicio</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Técnico Asignado</th>
                                        <th>Estado</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="fw-bold text-muted px-3">#O.R.24567</td>
                                        <td class="text-start">Reparación Eléctrica</td>
                                        <td class="text-muted">28 Mar 2026</td>
                                        <td>Kelly Ramirez</td>
                                        <td><span class="badge rounded-pill text-bg-warning px-3 py-2 fw-bold w-100 max-w-110">En Proceso</span></td>
                                        <td><button class="btn btn-sm text-primary bg-light rounded-circle" onclick="showDetail('#O.R.24567')"><i class="bi bi-eye-fill"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold text-muted px-3">#O.R.24501</td>
                                        <td class="text-start">Mantenimiento Preventivo</td>
                                        <td class="text-muted">15 Mar 2026</td>
                                        <td>Carlos Roa</td>
                                        <td><span class="badge rounded-pill text-bg-success px-3 py-2 fw-bold w-100 max-w-110">Finalizado</span></td>
                                        <td><button class="btn btn-sm text-primary bg-light rounded-circle" onclick="showDetail('#O.R.24501')"><i class="bi bi-eye-fill"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold text-muted px-3">#O.R.24489</td>
                                        <td class="text-start">Falla de Red Externa</td>
                                        <td class="text-muted">02 Mar 2026</td>
                                        <td class="text-muted">Sin Asignar</td>
                                        <td><span class="badge rounded-pill text-bg-danger px-3 py-2 fw-bold w-100 max-w-110">Cancelado</span></td>
                                        <td><button class="btn btn-sm text-primary bg-light rounded-circle" onclick="showDetail('#O.R.24489')"><i class="bi bi-eye-fill"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
            </div>
        </main>
    </div>

    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-20 border-0 nk-modal-shadow">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-nk-primary" id="detailTitle">Detalle del Servicio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4" id="detailBody"></div>
            </div>
        </div>
    </div>

    <nk-chat-btn></nk-chat-btn>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        function showDetail(id) {
            const s = window.nkStorage ? window.nkStorage.getServiceById(id) : null;
            if (!s) { alert('Servicio no encontrado: ' + id); return; }
            const statusClass = s.status==='En Proceso'?'warning':s.status==='Pendiente'?'secondary':s.status==='Finalizado'?'success':'danger';
            document.getElementById('detailTitle').textContent = s.id + ' - ' + s.type;
            document.getElementById('detailBody').innerHTML = `
                <div class="mb-3 d-flex justify-content-between"><strong>ID:</strong> <span>${s.id}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Tipo:</strong> <span>${s.type}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Fecha:</strong> <span>${s.date}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Técnico:</strong> <span>${s.tech}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Estado:</strong> <span class="badge text-bg-${statusClass} rounded-pill px-3">${s.status}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Prioridad:</strong> <span>${s.priority}</span></div>
                <hr>
                <div class="mb-3"><strong>Dirección:</strong><br><span class="text-muted">${s.address}</span></div>
                <div class="mb-0"><strong>Notas:</strong><br><span class="text-muted">${s.notes}</span></div>
            `;
            new bootstrap.Modal(document.getElementById('detailModal')).show();
        }
    </script>
</body>
</html>
