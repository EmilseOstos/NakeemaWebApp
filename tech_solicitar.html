<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nakeema - Solicitar Materiales</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <div class="dashboard-wrapper">
        <nk-sidebar role="tech" active="solicitar"></nk-sidebar>

        <main class="main-content">
            <div class="nk-card flex-grow-1 position-relative p-4 d-flex flex-column">
                
                <nk-topbar role="tech" username="Kelly Ramirez"></nk-topbar>

                <div class="px-md-4 py-4 flex-grow-1 w-100" style="max-width: 800px; margin: 0 auto;">
                    <h3 class="fw-bold mb-4 text-nk-primary fs-24">Solicitar Materiales a Bodega</h3>
                    
                    <div class="nk-card p-4 p-md-5 bg-white shadow-sm rounded-16">
                        <form id="materialForm" onsubmit="submitMaterial(event)">
                            <div class="row g-4">
                                <div class="col-md-8">
                                    <label class="form-label text-muted fw-bold fs-13">Nombre del Material o Herramienta</label>
                                    <input type="text" id="matName" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" placeholder="Ej. Rollo de Cable 12AWG" required>
                                </div>
                                
                                <div class="col-md-4">
                                    <label class="form-label text-muted fw-bold fs-13">Cantidad Necesaria</label>
                                    <input type="number" id="matQty" class="form-control bg-light border-0 py-2 px-3 shadow-none rounded-3" value="1" min="1" required>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label text-muted fw-bold fs-13">Servicio Asociado (Opcional)</label>
                                    <select id="matService" class="form-select bg-light border-0 py-2 px-3 shadow-none rounded-3 text-muted">
                                        <option selected value="">Ninguno / Uso General</option>
                                        <option value="#O.R.24567">#O.R.24567 - Reparación Eléctrica</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label text-muted fw-bold fs-13">Nivel de Urgencia</label>
                                    <select id="matUrgency" class="form-select bg-light border-0 py-2 px-3 shadow-none rounded-3 text-danger fw-bold">
                                        <option value="Normal" class="text-dark">Normal (Bodega general)</option>
                                        <option value="Urgente">Urgente (Detiene el servicio actual)</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label text-muted fw-bold fs-13">Justificación de la Solicitud</label>
                                    <textarea id="matJustification" class="form-control bg-light border-0 py-3 px-3 shadow-none rounded-3" rows="3" placeholder="Explique brevemente por qué requiere estos materiales..."></textarea>
                                </div>
                                
                                <div class="col-12 mt-4 d-flex justify-content-center border-top pt-4">
                                    <button type="submit" class="btn btn-success rounded-pill fw-bold shadow-sm bg-nk-primary border-0 btn-form-action">
                                        Enviar Solicitud a Bodega
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
        function submitMaterial(e) {
            e.preventDefault();
            if (!window.nkStorage) return;
            const mat = {
                name: document.getElementById('matName').value,
                quantity: document.getElementById('matQty').value,
                serviceId: document.getElementById('matService').value || 'Uso General',
                urgency: document.getElementById('matUrgency').value,
                justification: document.getElementById('matJustification').value || ''
            };
            window.nkStorage.addMaterial(mat);
            window.nkStorage.showToast('Solicitud de ' + mat.name + ' enviada a bodega');
            document.getElementById('materialForm').reset();
        }
    </script>
</body>
</html>
