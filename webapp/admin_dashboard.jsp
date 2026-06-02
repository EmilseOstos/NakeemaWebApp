<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="admin" active="dashboard"></nk-sidebar>

        <main class="main-content">
            <nk-topbar role="admin" username="Administrador"></nk-topbar>

            <div class="row g-3 mt-2">
                <div class="col-md-4">
                    <div class="nk-card stat-card"><h3>Servicios Hoy</h3><div class="value">15</div></div>
                </div>
                <div class="col-md-4">
                    <div class="nk-card stat-card"><h3>Técnicos Activos</h3><div class="value">6</div></div>
                </div>
                <div class="col-md-4">
                    <div class="nk-card stat-card"><h3>Alertas</h3><div class="value">3</div></div>
                </div>
            </div>

            <div class="row g-3 mt-1 flex-grow-1">
                <div class="col-md-6 d-flex flex-column">
                    <div class="nk-card flex-grow-1 d-flex flex-column">
                        <h4 class="text-center mb-4 fw-bold pb-2 border-bottom fs-16">Panel General</h4>
                        <div class="panels-container mt-2">
                            <button class="panel-btn" onclick="window.location='admin_gestion.html'">
                                <span class="title">Registros completados:</span><span class="val">400</span>
                            </button>
                            <button class="panel-btn" onclick="window.location='admin_gestion.html'">
                                <span class="title">Servicios Pendientes:</span><span class="val">6</span>
                            </button>
                            <button class="panel-btn mb-0" onclick="window.location='admin_gestion.html'">
                                <span class="title">Historial de Servicios</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 d-flex flex-column">
                    <div class="nk-card flex-grow-1">
                        <h4 class="text-center mb-4 fw-bold pb-2 border-bottom fs-16">Estado Técnicos</h4>
                        <div id="techStatusList" class="mt-3"></div>
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
        document.addEventListener('DOMContentLoaded', function() {
            if (!window.nkStorage) return;
            const techs = window.nkStorage.getTechnicians();
            const container = document.getElementById('techStatusList');
            const colors = ['#0da766', '#6c757d', '#dc3545', '#0d6efd', '#fd7e14', '#6f42c1', '#20c997'];
            container.innerHTML = techs.map((t, i) => {
                const badgeClass = t.status === 'Disponible' ? 'text-bg-success' : t.status === 'Ocupado' ? 'text-bg-warning' : 'text-bg-danger';
                return `
                <div class="tech-status-item">
                    <div class="tech-status-info">
                        <div class="tech-status-avatar" style="background:${colors[i % colors.length]}"><i class="bi bi-person-fill"></i></div>
                        <div>
                            <div class="fw-bold fs-14">${t.name}</div>
                            <div class="text-muted fs-12">${t.specialty}</div>
                        </div>
                    </div>
                    <span class="badge ${badgeClass} rounded-pill px-3">${t.status}</span>
                </div>`;
            }).join('');
        });
    </script>
</body>
</html>
