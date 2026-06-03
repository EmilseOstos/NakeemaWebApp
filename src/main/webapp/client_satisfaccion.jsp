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
    <title>Nakeema - Reporte de Satisfacción</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="client" active="satisfaccion" context="${pageContext.request.contextPath}"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 d-flex flex-column position-relative">
                
                <nk-topbar role="client" username="Emilse Ostos"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100" style="max-width: 600px; margin: 0 auto;">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Reporte de Satisfacción</h3>
                    
                    <div class="nk-card p-4 p-md-5 bg-white shadow-sm text-center rounded-16">
                        <i class="bi bi-emoji-heart-eyes fs-60 text-nk-primary"></i>
                        <h4 class="fw-bold mt-3 mb-2 text-nk-dark-3">¡Queremos escucharte!</h4>
                        <p class="text-muted mb-4 fs-14">Evalúa el servicio prestado para ayudarnos a mejorar cada día.</p>
                        
                        <form class="text-start" id="satisfactionForm" onsubmit="submitSatisfaction(event)">
                            <div class="mb-4">
                                <label class="form-label text-muted fw-bold fs-13">Servicio a calificar</label>
                                <select class="form-select bg-light border-0 py-2 px-3 shadow-none rounded-3 text-dark fw-bold" id="satService">
                                    <option value="#O.R.24501">#O.R.24501 - Mantenimiento Preventivo (15/03/2026)</option>
                                    <option value="#O.R.24210">#O.R.24210 - Reparación Eléctrica (05/01/2026)</option>
                                </select>
                            </div>
                            
                            <div class="mb-4 text-center">
                                <label class="form-label text-muted fw-bold d-block mb-3 fs-13">Calificación del Técnico</label>
                                <div class="d-flex justify-content-center gap-2 fs-1 star-rating" id="starRating">
                                    <i class="bi bi-star-fill active" data-value="1" onclick="setRating(1)"></i>
                                    <i class="bi bi-star-fill active" data-value="2" onclick="setRating(2)"></i>
                                    <i class="bi bi-star-fill active" data-value="3" onclick="setRating(3)"></i>
                                    <i class="bi bi-star-fill active" data-value="4" onclick="setRating(4)"></i>
                                    <i class="bi bi-star inactive" data-value="5" onclick="setRating(5)"></i>
                                </div>
                                <div class="fw-bold mt-2" id="ratingLabel" style="color: var(--nk-primary);">¡Muy Bueno!</div>
                                <input type="hidden" id="ratingValue" value="4">
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label text-muted fw-bold fs-13">Comentarios (Opcional)</label>
                                <textarea class="form-control bg-light border-0 py-3 px-3 shadow-none rounded-3" rows="3" placeholder="¿Qué te pareció el servicio? Cuéntanos tu experiencia..." id="satComment"></textarea>
                            </div>
                            
                            <div class="d-flex justify-content-center mt-4">
                                <button type="submit" class="btn btn-success rounded-pill fw-bold shadow-sm bg-nk-primary border-0 btn-form-action">
                                    Enviar Evaluación
                                </button>
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
        let currentRating = 4;
        const labels = ['', '😞 Malo', '😐 Regular', '🙂 Bueno', '😊 ¡Muy Bueno!', '🤩 ¡Excelente!'];

        function setRating(val) {
            currentRating = val;
            document.getElementById('ratingValue').value = val;
            document.getElementById('ratingLabel').textContent = labels[val];
            const stars = document.querySelectorAll('#starRating i');
            stars.forEach((star, i) => {
                if (i < val) {
                    star.className = 'bi bi-star-fill active';
                } else {
                    star.className = 'bi bi-star inactive';
                }
            });
        }

        // Hover effect
        document.querySelectorAll('#starRating i').forEach(star => {
            star.addEventListener('mouseenter', function() {
                const val = parseInt(this.dataset.value);
                const stars = document.querySelectorAll('#starRating i');
                stars.forEach((s, i) => {
                    if (i < val) s.className = 'bi bi-star-fill active';
                    else s.className = 'bi bi-star inactive';
                });
            });
        });
        document.getElementById('starRating').addEventListener('mouseleave', function() {
            setRating(currentRating);
        });

        function submitSatisfaction(e) {
            e.preventDefault();
            if (!window.nkStorage) { alert('Error de almacenamiento'); return; }
            const report = {
                serviceId: document.getElementById('satService').value,
                rating: currentRating,
                comment: document.getElementById('satComment').value || 'Sin comentarios'
            };
            window.nkStorage.addSatisfactionReport(report);
            window.nkStorage.showToast('¡Gracias! Tu evaluación ha sido enviada exitosamente');
            document.getElementById('satisfactionForm').reset();
            setRating(4);
        }
    </script>
</body>
</html>
