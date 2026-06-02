<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    jakarta.servlet.http.HttpSession miSesion = request.getSession(false);
    String usuarioLogueado = (miSesion != null) ? (String) miSesion.getAttribute("usuarioLogueado") : null;
    String rolUsuario = (miSesion != null) ? (String) miSesion.getAttribute("rolUsuario") : null;

    if (usuarioLogueado == null || !"tech".equals(rolUsuario)) {
        response.sendRedirect(request.getContextPath() + "/index.jsp?error=no_autorizado");
        return;
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Actualizar Estado</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="tech" active="modificar"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 position-relative p-4 d-flex flex-column">
                
                <nk-topbar role="tech" username="Kelly Ramirez"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100" style="max-width: 800px; margin: 0 auto;">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Actualizar Estado de Servicio</h3>
                    
                    <div class="nk-card p-4 p-md-5 bg-white shadow-sm rounded-16">
                        <form id="modifyForm" onsubmit="submitModify(event)">
                            <div class="row g-4">
                                <div class="col-md-8">
                                    <label class="form-label text-muted fw-bold fs-13">Buscar O.R. / Servicio</label>
                                    <div class="input-group overflow-hidden rounded-3">
                                        <input type="text" id="modSearch" class="form-control bg-light border-0 py-2 shadow-none px-3" placeholder="Ingrese ID (Ej. #O.R.24567)">
                                        <button class="btn border-0 py-2 text-white px-4 fw-bold bg-nk-primary" type="button" onclick="searchService()">Buscar</button>
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <div id="servicePreview" class="p-3 bg-light rounded-3 border border-1 border-nk">
                                        <div class="d-flex justify-content-between mb-2">
                                            <span class="text-muted fw-bold fs-13">Servicio Seleccionado:</span>
                                            <span class="fw-bold text-dark" id="modServiceName">#O.R.24567 - Reparación Eléctrica</span>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <span class="text-muted fw-bold fs-13">Estado Actual:</span>
                                            <span class="badge text-bg-warning" id="modCurrentStatus">En Proceso</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-12 mt-4">
                                    <label class="form-label text-muted fw-bold fs-13">Nuevo Estado</label>
                                    <select id="modNewStatus" class="form-select bg-light border-0 py-3 px-3 shadow-none rounded-3 text-dark fw-bold fs-6">
                                        <option value="En Proceso">En Proceso</option>
                                        <option value="Esperando Repuestos">Esperando Repuestos</option>
                                        <option value="Requiere Aprobación del Cliente">Requiere Aprobación del Cliente</option>
                                        <option value="Finalizado">Finalizado Exitosamente</option>
                                        <option value="Cancelado">Cancelado / No Reparable</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label text-muted fw-bold fs-13">Notas Técnicas (Visibles internamente)</label>
                                    <textarea id="modNotes" class="form-control bg-light border-0 py-3 px-3 shadow-none rounded-3" rows="4" placeholder="Escriba los detalles de la actualización, hallazgos o recomendaciones..."></textarea>
                                </div>
                                
                                <div class="col-12 mt-4 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-success rounded-pill fw-bold shadow-sm bg-nk-primary border-0 btn-form-action">
                                        Actualizar Servicio
                                    </button>
                                </div>
                            </div>
                        </form>
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
        let currentModId = '#O.R.24567';

        function searchService() {
            if (!window.nkStorage) return;
            let q = document.getElementById('modSearch').value.trim();
            if (!q.startsWith('#')) q = '#' + q;
            const s = window.nkStorage.getServiceById(q);
            if (s) {
                currentModId = s.id;
                document.getElementById('modServiceName').textContent = s.id + ' - ' + s.type;
                const statusClass = s.status==='En Proceso'?'warning':s.status==='Pendiente'?'secondary':s.status==='Finalizado'?'success':'danger';
                document.getElementById('modCurrentStatus').textContent = s.status;
                document.getElementById('modCurrentStatus').className = 'badge text-bg-' + statusClass;
                window.nkStorage.showToast('Servicio encontrado: ' + s.id, 'info');
            } else {
                window.nkStorage.showToast('No se encontró el servicio ' + q, 'error');
            }
        }

        function submitModify(e) {
            e.preventDefault();
            if (!window.nkStorage || !currentModId) return;
            const newStatus = document.getElementById('modNewStatus').value;
            const notes = document.getElementById('modNotes').value;
            const updates = { status: newStatus };
            if (notes) {
                const s = window.nkStorage.getServiceById(currentModId);
                updates.notes = (s ? s.notes : '') + ' | ' + notes;
            }
            window.nkStorage.updateService(currentModId, updates);
            window.nkStorage.showToast('Servicio ' + currentModId + ' actualizado a "' + newStatus + '"');
            // Refresh preview
            const statusClass = newStatus==='En Proceso'?'warning':newStatus==='Pendiente'?'secondary':newStatus==='Finalizado'?'success':'danger';
            document.getElementById('modCurrentStatus').textContent = newStatus;
            document.getElementById('modCurrentStatus').className = 'badge text-bg-' + statusClass;
        }
    </script>
</body>
</html>
