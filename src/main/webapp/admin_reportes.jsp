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
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Admin Dashboard</title>
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
        <nk-sidebar role="admin" active="reportes"></nk-sidebar>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Topbar -->
            <nk-topbar role="admin" username="Administrador"></nk-topbar>

            <div class="px-md-4 py-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold m-0 text-nk-primary fs-24">Reportes de Rendimiento</h3>
                    <button class="btn btn-outline-secondary rounded-pill px-4 fw-bold shadow-sm" onclick="exportPDF()">
                        <i class="bi bi-download me-2"></i> Exportar PDF
                    </button>
                </div>

                <!-- Stats Row -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="nk-card stat-card p-3 shadow-sm bg-white stat-card-report">
                            <h3 class="fs-13-allcaps text-nk-muted">Total Ingresos</h3>
                            <div class="value mt-2 val-report">$12,450</div>
                            <div class="text-success mt-2 fs-12"><i class="bi bi-arrow-up-right me-1"></i> +8.5% este mes</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="nk-card stat-card p-3 shadow-sm bg-white stat-card-report success">
                            <h3 class="fs-13-allcaps text-nk-muted">Completados</h3>
                            <div class="value mt-2 val-report">145</div>
                            <div class="text-success mt-2 fs-12"><i class="bi bi-arrow-up-right me-1"></i> +12% este mes</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="nk-card stat-card p-3 shadow-sm bg-white stat-card-report warning">
                            <h3 class="fs-13-allcaps text-nk-muted">En Proceso</h3>
                            <div class="value mt-2 val-report">32</div>
                            <div class="text-muted mt-2 fs-12">Actividad constante</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="nk-card stat-card p-3 shadow-sm bg-white stat-card-report danger">
                            <h3 class="fs-13-allcaps text-nk-muted">Cancelados</h3>
                            <div class="value mt-2 val-report">4</div>
                            <div class="text-danger mt-2 fs-12"><i class="bi bi-arrow-down-right me-1"></i> -2% este mes</div>
                        </div>
                    </div>
                </div>

                <!-- Charts Placeholders -->
                <div class="row g-3">
                    <div class="col-md-8">
                        <div class="nk-card p-4 shadow-sm h-100 bg-white" style="border-radius: 15px;">
                            <h5 class="fw-bold mb-4 fs-6 text-muted">Evolución de Servicios Mensual</h5>
                            <div class="d-flex align-items-end justify-content-around h-100 flex-grow-1 chart-container">
                                <div class="chart-bar" style="height: 40%; opacity: 0.7;"></div>
                                <div class="chart-bar" style="height: 60%; opacity: 0.8;"></div>
                                <div class="chart-bar" style="height: 50%; opacity: 0.7;"></div>
                                <div class="chart-bar" style="height: 80%; opacity: 0.9;"></div>
                                <div class="chart-bar" style="height: 75%; opacity: 0.8;"></div>
                                <div class="chart-bar" style="height: 95%; opacity: 1;"></div>
                            </div>
                            <div class="d-flex justify-content-around text-muted mt-2 border-top pt-2 fw-bold" style="font-size: 11px;">
                                <span>Ene</span> <span>Feb</span> <span>Mar</span> <span>Abr</span> <span>May</span> <span>Jun</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="nk-card p-4 shadow-sm h-100 d-flex flex-column align-items-center bg-white" style="border-radius: 15px;">
                            <h5 class="fw-bold mb-4 fs-6 text-muted w-100 text-start">Distribución por Estado</h5>
                            <div class="position-relative d-flex justify-content-center align-items-center flex-grow-1 my-3 chart-pie-placeholder">
                                <div class="fw-bold fs-3 text-dark">181</div>
                            </div>
                            <div class="w-100 mt-auto">
                                <div class="d-flex justify-content-between mb-2" style="font-size: 12px;"><span class="text-muted"><i class="bi bi-circle-fill text-success me-2"></i>Completados</span> <span class="fw-bold">80%</span></div>
                                <div class="d-flex justify-content-between mb-2" style="font-size: 12px;"><span class="text-muted"><i class="bi bi-circle-fill text-warning me-2"></i>Proceso</span> <span class="fw-bold">18%</span></div>
                                <div class="d-flex justify-content-between" style="font-size: 12px;"><span class="text-muted"><i class="bi bi-circle-fill text-danger me-2"></i>Cancelados</span> <span class="fw-bold">2%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nk-footer-inline">&copy; 2026 Todos los derechos Reservados. Nakeema</div>
        </main>
    </div>

    <nk-chat-btn></nk-chat-btn>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
    <script>
        function exportPDF() {
            // A basic blank valid PDF structure just as proof of concept
            const text = "%PDF-1.4\n1 0 obj <</Type/Catalog/Pages 2 0 R>> endobj\n2 0 obj <</Type/Pages/Kids[3 0 R]/Count 1>> endobj\n3 0 obj <</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>/Contents 4 0 R>> endobj\n4 0 obj <</Length 21>> stream\nBT /F1 24 Tf 144 720 Td (Reporte Nakeema) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000109 00000 n \n0000000196 00000 n \ntrailer <</Size 5/Root 1 0 R>>\nstartxref\n268\n%%EOF";
            const blob = new Blob([text], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Reporte_Nakeema_Abril2026.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
