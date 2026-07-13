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
    <title>Nakeema - Técnicos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="admin" active="tecnicos" context="${pageContext.request.contextPath}"></nk-sidebar>

        <main class="main-content">
            <nk-topbar role="admin" username="${usuarioLogueado}"></nk-topbar>

            <div class="px-md-4 py-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold m-0 text-nk-primary fs-24">Directorio de Técnicos</h3>
                    <button class="btn btn-success rounded-pill px-4 fw-bold shadow-sm bg-nk-primary border-0" data-bs-toggle="modal" data-bs-target="#addTechModal">
                        <i class="bi bi-person-plus-fill me-2"></i> Nuevo Técnico
                    </button>
                </div>

                <div class="row g-4" id="techCardsContainer"></div>
            </div>

            <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
        </main>
    </div>

    <!-- Add Technician Modal -->
    <div class="modal fade" id="addTechModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-20 border-0 nk-modal-shadow">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-nk-primary">Registrar Nuevo Técnico</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body pt-4 p-4">
                    <form id="addTechForm" onsubmit="return addNewTech(event)">
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Nombre Completo</label>
                            <input type="text" id="techName" class="form-control bg-light border-0 py-2" required minlength="3" maxlength="100">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold fs-13">Especialidad</label>
                            <select id="techSpecialty" class="form-select bg-light border-0 py-2" required>
                                <option value="" selected disabled>Seleccione...</option>
                                <option value="Especialista Eléctrico">Especialista Eléctrico</option>
                                <option value="Mecánico General">Mecánico General</option>
                                <option value="Soporte Técnico Nivel 2">Soporte Técnico Nivel 2</option>
                                <option value="Técnico de Redes">Técnico de Redes</option>
                            </select>
                        </div>
                        <div class="row mb-4">
                            <div class="col-6">
                                <label class="form-label text-muted fw-bold fs-13">Teléfono</label>
                                <input type="tel" id="techPhone" class="form-control bg-light border-0 py-2" required pattern="^\+?[0-9\s\-()]{7,15}$">
                                <div class="invalid-feedback"></div>
                            </div>
                            <div class="col-6">
                                <label class="form-label text-muted fw-bold fs-13">Estado Inicial</label>
                                <select id="techStatus" class="form-select bg-light border-0 py-2">
                                    <option value="Disponible">Disponible</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm bg-nk-primary border-0">Guardar Técnico</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-20 border-0 nk-modal-shadow">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-nk-primary" id="profileTitle">Perfil del Técnico</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4" id="profileBody"></div>
            </div>
        </div>
    </div>

    <nk-chat-btn></nk-chat-btn>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        const avatarColors = ['#0da766', '#6c757d', '#dc3545', '#0d6efd', '#fd7e14', '#6f42c1', '#20c997'];

        function renderTechCards() {
            if (!window.nkStorage) return;
            const techs = window.nkStorage.getTechnicians();
            const container = document.getElementById('techCardsContainer');
            container.innerHTML = techs.map((t, i) => {
                const badgeClass = t.status === 'Disponible' ? 'text-bg-success' : t.status === 'Ocupado' ? 'text-bg-warning' : 'text-bg-danger';
                const avatarBg = avatarColors[i % avatarColors.length];
                const actionBtn = t.status === 'Disponible'
                    ? `<button class="btn btn-success btn-sm rounded-pill fw-bold bg-nk-primary border-0 btn-tech-card" onclick="assignTech('${t.name}')">Asignar</button>`
                    : t.status === 'Ocupado'
                    ? `<button class="btn btn-secondary btn-sm rounded-pill fw-bold border-0 btn-tech-card" disabled>Ocupado</button>`
                    : `<button class="btn btn-outline-danger btn-sm rounded-pill fw-bold btn-tech-card" onclick="window.nkStorage.showToast('Contactando a ${t.name}...','info')">Contactar</button>`;

                return `
                <div class="col-md-6 col-lg-4">
                    <div class="nk-card p-4 shadow-sm text-center position-relative bg-white tech-card h-100 d-flex flex-column">
                        <span class="position-absolute top-0 end-0 m-3 badge rounded-pill ${badgeClass}">${t.status}</span>
                        <div class="avatar mx-auto mb-3 shadow-sm border border-2 border-white avatar-tech" style="background-color:${avatarBg};">
                            <i class="bi bi-person fs-1"></i>
                        </div>
                        <h5 class="fw-bold mb-1 fs-18">${t.name}</h5>
                        <p class="text-muted mb-3 fs-13 flex-grow-1">${t.specialty}</p>
                        <div class="d-flex justify-content-between px-3 border-top pt-3 text-muted mb-3 fs-12 fw-600 mt-auto">
                            <div><i class="bi bi-star-fill text-warning me-1"></i> ${t.rating}/5</div>
                            <div><i class="bi bi-tools me-1"></i> ${t.services} Serv.</div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 w-100">
                            <button class="btn btn-outline-success btn-sm rounded-pill fw-bold btn-outline-nk btn-tech-card" onclick="viewProfile(${i})">Ver Perfil</button>
                            ${actionBtn}
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        function viewProfile(idx) {
            const techs = window.nkStorage.getTechnicians();
            const t = techs[idx];
            if (!t) return;
            const badgeClass = t.status === 'Disponible' ? 'text-bg-success' : t.status === 'Ocupado' ? 'text-bg-warning' : 'text-bg-danger';
            document.getElementById('profileTitle').textContent = t.name;
            document.getElementById('profileBody').innerHTML = `
                <div class="text-center mb-4">
                    <div class="avatar mx-auto mb-3 shadow-sm border border-2 border-white avatar-tech" style="background:${avatarColors[idx % avatarColors.length]}"><i class="bi bi-person fs-1"></i></div>
                    <h5 class="fw-bold">${t.name}</h5>
                    <p class="text-muted">${t.specialty}</p>
                    <span class="badge ${badgeClass} rounded-pill px-3 py-2">${t.status}</span>
                </div>
                <hr>
                <div class="mb-2 d-flex justify-content-between"><strong>Rating:</strong><span><i class="bi bi-star-fill text-warning"></i> ${t.rating}/5</span></div>
                <div class="mb-2 d-flex justify-content-between"><strong>Servicios:</strong><span>${t.services}</span></div>
                <div class="mb-2 d-flex justify-content-between"><strong>Teléfono:</strong><span>${t.phone || 'N/A'}</span></div>
                <div class="mb-2 d-flex justify-content-between"><strong>Email:</strong><span>${t.email || 'N/A'}</span></div>
                <div class="mb-0 d-flex justify-content-between"><strong>Fecha ingreso:</strong><span>${t.joinDate || 'N/A'}</span></div>
            `;
            new bootstrap.Modal(document.getElementById('profileModal')).show();
        }

        function assignTech(name) {
            window.nkStorage.showToast('Técnico ' + name + ' listo para asignar. Vaya a Gestión de Servicios.', 'info');
        }

        function validateTechForm() {
            const name = document.getElementById('techName');
            const specialty = document.getElementById('techSpecialty');
            const phone = document.getElementById('techPhone');
            let valid = true;

            name.classList.remove('is-invalid');
            phone.classList.remove('is-invalid');

            if (!name.value.trim() || name.value.trim().length < 3) {
                name.classList.add('is-invalid');
                name.nextElementSibling.textContent = 'Nombre debe tener al menos 3 caracteres';
                valid = false;
            }
            if (/[<>"';()&%]/.test(name.value)) {
                name.classList.add('is-invalid');
                name.nextElementSibling.textContent = 'Caracteres no permitidos';
                valid = false;
            }
            if (!specialty.value) { valid = false; }
            if (!phone.value.trim()) {
                phone.classList.add('is-invalid');
                phone.nextElementSibling.textContent = 'Teléfono es requerido';
                valid = false;
            } else if (!/^\+?[\d\s\-()]{7,15}$/.test(phone.value)) {
                phone.classList.add('is-invalid');
                phone.nextElementSibling.textContent = 'Formato de teléfono inválido (7-15 dígitos)';
                valid = false;
            }

            return valid;
        }

        function addNewTech(e) {
            e.preventDefault();
            if (!validateTechForm()) return;
            if (!window.nkStorage) return;
            const tech = {
                name: document.getElementById('techName').value,
                specialty: document.getElementById('techSpecialty').value,
                status: document.getElementById('techStatus').value,
                rating: 5.0,
                services: 0,
                phone: document.getElementById('techPhone').value,
                email: '',
                joinDate: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
            };
            window.nkStorage.addTechnician(tech);
            window.nkStorage.showToast('Técnico ' + tech.name + ' registrado');
            bootstrap.Modal.getInstance(document.getElementById('addTechModal')).hide();
            document.getElementById('addTechForm').reset();
            renderTechCards();
        }

        document.addEventListener('DOMContentLoaded', renderTechCards);
    </script>
</body>
</html>
