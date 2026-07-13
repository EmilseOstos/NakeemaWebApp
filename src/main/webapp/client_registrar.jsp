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
    <title>Nakeema - Registrar Servicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="client" active="registrar" context="${pageContext.request.contextPath}"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 d-flex flex-column position-relative">
                
                <nk-topbar role="client" username="${usuarioLogueado}"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100 max-w-800 mx-auto">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Registrar Nuevo Servicio</h3>
                    
                    <div class="nk-card p-4 p-md-5 bg-white shadow-sm rounded-16">
                        <form id="registerForm" onsubmit="return submitRegister(event)">
                            <div class="row g-4">
                                <div class="col-md-12">
                                    <label class="form-label text-muted fw-bold fs-13">Título del Problema / Servicio</label>
                                    <input type="text" id="regTitle" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" placeholder="Ej. Falla en el sistema eléctrico principal" required minlength="5" maxlength="200">
                                    <div class="invalid-feedback"></div>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label text-muted fw-bold fs-13">Categoría del Servicio</label>
                                    <select id="regCategory" class="form-select bg-light border-0 py-2 px-3 shadow-none rounded-3 text-muted" required>
                                        <option value="" selected disabled>Seleccionar categoría...</option>
                                        <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
                                        <option value="Reparación Eléctrica">Reparación Eléctrica</option>
                                        <option value="Soporte Tecnológico">Soporte Tecnológico</option>
                                        <option value="Revisión General">Revisión General</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label text-muted fw-bold fs-13">Nivel de Prioridad</label>
                                    <select id="regPriority" class="form-select bg-light border-0 py-2 px-3 shadow-none rounded-3 text-muted" required>
                                        <option value="" selected disabled>Seleccionar prioridad...</option>
                                        <option value="Baja">Baja (Sin urgencia)</option>
                                        <option value="Media">Media (En los próximos días)</option>
                                        <option value="Alta">Alta (Requiere atención urgente)</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label text-muted fw-bold fs-13">Dirección de Atención</label>
                                    <div class="input-group overflow-hidden rounded-3">
                                        <span class="input-group-text bg-light border-0 text-muted"><i class="bi bi-geo-alt-fill text-danger"></i></span>
                                        <input type="text" id="regAddress" class="form-control bg-light border-0 py-2 shadow-none" placeholder="Dirección donde se requiere el servicio" value="Avenida Principal 456, Edificio Central" required minlength="5" maxlength="200">
                                    </div>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label text-muted fw-bold fs-13">Descripción Detallada</label>
                                    <textarea id="regDescription" class="form-control bg-light border-0 py-3 px-3 shadow-none rounded-3" rows="4" placeholder="Describe los detalles del problema, síntomas que presenta o requerimientos específicos..." maxlength="500"></textarea>
                                </div>
                                
                                <div class="col-12 mt-5 d-flex justify-content-center align-items-center gap-3 flex-wrap">
                                    <button type="button" class="btn btn-secondary rounded-pill fw-bold m-0 btn-form-action" onclick="document.getElementById('registerForm').reset()">Cancelar</button>
                                    <button type="submit" class="btn btn-success rounded-pill fw-bold shadow-sm bg-nk-primary border-0 m-0 btn-form-action">
                                        Registrar Solicitud
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
        function validateClientRegForm() {
            const title = document.getElementById('regTitle');
            const category = document.getElementById('regCategory');
            const priority = document.getElementById('regPriority');
            const address = document.getElementById('regAddress');
            let valid = true;

            [title, category, priority, address].forEach(el => el.classList.remove('is-invalid'));

            if (!title.value.trim() || title.value.trim().length < 5) {
                title.classList.add('is-invalid');
                title.nextElementSibling.textContent = 'El título debe tener al menos 5 caracteres';
                valid = false;
            }
            if (/[<>"';()&%]/.test(title.value)) {
                title.classList.add('is-invalid');
                title.nextElementSibling.textContent = 'Caracteres no permitidos (< > \" \' ;)';
                valid = false;
            }
            if (!category.value) {
                category.classList.add('is-invalid');
                valid = false;
            }
            if (!priority.value) {
                priority.classList.add('is-invalid');
                valid = false;
            }
            if (!address.value.trim() || address.value.trim().length < 5) {
                address.classList.add('is-invalid');
                valid = false;
            }

            return valid;
        }

        function submitRegister(e) {
            e.preventDefault();
            if (!validateClientRegForm()) return;
            if (!window.nkStorage) { alert('Error de almacenamiento'); return; }
            const service = {
                type: document.getElementById('regCategory').value,
                client: 'Emilse Ostos',
                tech: 'Sin Asignar',
                date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Pendiente',
                priority: document.getElementById('regPriority').value,
                address: document.getElementById('regAddress').value,
                zone: 'Norte - Cedritos',
                phone: '+573201234567',
                notes: document.getElementById('regTitle').value + '. ' + (document.getElementById('regDescription').value || '')
            };
            const created = window.nkStorage.addService(service);
            window.nkStorage.showToast('Solicitud ' + created.id + ' registrada exitosamente');
            document.getElementById('registerForm').reset();
        }
    </script>
</body>
</html>
