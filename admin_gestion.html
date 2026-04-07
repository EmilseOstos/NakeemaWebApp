<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Gestión de Servicios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="admin" active="gestion"></nk-sidebar>

        <main class="main-content">
            <nk-topbar role="admin" username="Administrador"></nk-topbar>

            <div class="px-md-4 py-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold m-0 text-nk-primary fs-24">Gestión de Servicios</h3>
                    <button class="btn btn-success rounded-pill px-4 fw-bold shadow-sm bg-nk-primary border-0" data-bs-toggle="modal" data-bs-target="#addServiceModal" onclick="resetModal()">
                        <i class="bi bi-plus-circle me-2"></i> Añadir Servicio
                    </button>
                </div>

                <div class="nk-card p-0 overflow-hidden shadow-sm border-nk rounded-12">
                    <div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-light flex-wrap gap-3">
                        <div class="input-group w-auto flex-grow-1 border-nk search-input-group">
                            <span class="input-group-text bg-white border-0"><i class="bi bi-search text-muted"></i></span>
                            <input type="text" class="form-control border-0 shadow-none" placeholder="Buscar servicio..." oninput="searchTable(this.value)">
                        </div>
                        <div>
                            <select id="statusFilter" class="form-select border-0 shadow-sm rounded-pill py-1 px-3 text-muted fs-14 cursor-pointer bg-white" onchange="filterTable()">
                                <option value="all">Todos los Estados</option>
                                <option value="en proceso">En Proceso</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="finalizado">Finalizado</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table-custom mb-0 text-center align-middle w-100">
                            <thead class="bg-table-head">
                                <tr>
                                    <th class="py-3 px-3">ID Servicio</th>
                                    <th>Cliente</th>
                                    <th>Técnico Asignado</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="servicesTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
        </main>
    </div>

    <!-- Add/Edit Service Modal -->
    <div class="modal fade" id="addServiceModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-20 border-0 nk-modal-shadow">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-nk-primary" id="modalTitle">Añadir Nuevo Servicio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body pt-4 p-4">
                    <form id="addServiceForm" onsubmit="saveService(event)">
                        <input type="hidden" id="editServiceId">
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Cliente</label>
                            <input type="text" id="serviceClient" class="form-control bg-light border-0 py-2" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Tipo de Servicio</label>
                            <select id="serviceType" class="form-select bg-light border-0 py-2" required>
                                <option value="" selected disabled>Seleccione...</option>
                                <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
                                <option value="Reparación Eléctrica">Reparación Eléctrica</option>
                                <option value="Soporte Tecnológico">Soporte Tecnológico</option>
                                <option value="Revisión General">Revisión General</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Técnico Asignado</label>
                            <select id="serviceTech" class="form-select bg-light border-0 py-2">
                                <option value="Sin Asignar">Sin asignar</option>
                                <option value="Kelly Ramirez">Kelly Ramirez</option>
                                <option value="Carlos Roa">Carlos Roa</option>
                                <option value="Luis Zea">Luis Zea</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Dirección</label>
                            <input type="text" id="serviceAddress" class="form-control bg-light border-0 py-2" placeholder="Dirección del servicio">
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-muted fw-bold fs-13">Prioridad</label>
                            <select id="servicePriority" class="form-select bg-light border-0 py-2">
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                                <option value="Baja">Baja</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm bg-nk-primary border-0">Guardar Servicio</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-20 border-0 nk-modal-shadow">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-nk-primary" id="detailTitle">Detalle</h5>
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
        let editingId = null;

        function renderTable() {
            if (!window.nkStorage) return;
            const services = window.nkStorage.getServices();
            const tbody = document.getElementById('servicesTableBody');
            tbody.innerHTML = services.map(s => {
                const sc = s.status==='En Proceso'?'warning':s.status==='Pendiente'?'secondary':s.status==='Finalizado'?'success':'danger';
                return `
                <tr data-id="${s.id}">
                    <td class="fw-bold text-muted px-3">${s.id}</td>
                    <td>${s.client}</td>
                    <td>${s.tech}</td>
                    <td class="text-muted">${s.date}</td>
                    <td><span class="badge rounded-pill text-bg-${sc} px-3">${s.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-light text-primary rounded-circle mx-1" onclick="viewDetail('${s.id}')"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-light text-success rounded-circle mx-1" onclick="editService('${s.id}')"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-light text-danger rounded-circle mx-1" onclick="deleteService('${s.id}')"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>`;
            }).join('');
        }

        function resetModal() {
            document.getElementById('modalTitle').textContent = 'Añadir Nuevo Servicio';
            document.getElementById('addServiceForm').reset();
            document.getElementById('editServiceId').value = '';
            editingId = null;
        }

        function viewDetail(id) {
            const s = window.nkStorage.getServiceById(id);
            if (!s) return;
            const sc = s.status==='En Proceso'?'warning':s.status==='Pendiente'?'secondary':s.status==='Finalizado'?'success':'danger';
            document.getElementById('detailTitle').textContent = s.id + ' - ' + s.type;
            document.getElementById('detailBody').innerHTML = `
                <div class="mb-3 d-flex justify-content-between"><strong>Cliente:</strong><span>${s.client}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Técnico:</strong><span>${s.tech}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Fecha:</strong><span>${s.date}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Prioridad:</strong><span>${s.priority}</span></div>
                <div class="mb-3 d-flex justify-content-between"><strong>Estado:</strong><span class="badge text-bg-${sc} rounded-pill px-3">${s.status}</span></div>
                <hr>
                <div class="mb-3"><strong>Dirección:</strong><br><span class="text-muted">${s.address}</span></div>
                <div class="mb-0"><strong>Notas:</strong><br><span class="text-muted">${s.notes}</span></div>
            `;
            new bootstrap.Modal(document.getElementById('detailModal')).show();
        }

        function editService(id) {
            const s = window.nkStorage.getServiceById(id);
            if (!s) return;
            editingId = id;
            document.getElementById('modalTitle').textContent = 'Editar Servicio ' + id;
            document.getElementById('editServiceId').value = id;
            document.getElementById('serviceClient').value = s.client;
            document.getElementById('serviceType').value = s.type;
            document.getElementById('serviceTech').value = s.tech;
            document.getElementById('serviceAddress').value = s.address || '';
            document.getElementById('servicePriority').value = s.priority || 'Media';
            new bootstrap.Modal(document.getElementById('addServiceModal')).show();
        }

        function saveService(e) {
            e.preventDefault();
            if (!window.nkStorage) return;
            const client = document.getElementById('serviceClient').value;
            const type = document.getElementById('serviceType').value;
            const tech = document.getElementById('serviceTech').value;
            const address = document.getElementById('serviceAddress').value;
            const priority = document.getElementById('servicePriority').value;

            if (editingId) {
                window.nkStorage.updateService(editingId, { client, type, tech, address, priority });
                window.nkStorage.showToast('Servicio ' + editingId + ' actualizado');
            } else {
                const s = window.nkStorage.addService({
                    type, client, tech: tech || 'Sin Asignar',
                    date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
                    status: 'Pendiente', priority, address,
                    zone: '', phone: '', notes: type
                });
                window.nkStorage.showToast('Servicio ' + s.id + ' creado');
            }
            bootstrap.Modal.getInstance(document.getElementById('addServiceModal')).hide();
            editingId = null;
            renderTable();
        }

        function deleteService(id) {
            if (!confirm('¿Eliminar servicio ' + id + '?')) return;
            window.nkStorage.deleteService(id);
            window.nkStorage.showToast('Servicio eliminado', 'error');
            renderTable();
        }

        function filterTable() {
            const f = document.getElementById('statusFilter').value.toLowerCase();
            document.querySelectorAll('#servicesTableBody tr').forEach(r => {
                const badge = r.querySelector('.badge');
                if (!badge) return;
                r.style.display = (f === 'all' || badge.textContent.toLowerCase().includes(f)) ? '' : 'none';
            });
        }

        function searchTable(q) {
            q = q.toLowerCase();
            document.querySelectorAll('#servicesTableBody tr').forEach(r => {
                r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        }

        document.addEventListener('DOMContentLoaded', renderTable);
    </script>
</body>
</html>
