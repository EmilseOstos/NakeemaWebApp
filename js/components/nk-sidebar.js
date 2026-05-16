export class NkSidebar extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute('role') || 'client';
        const activePage = this.getAttribute('active') || '';

        this.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-logo">
                <img src="img/logo.png" alt="Nakeema Logo" class="nk-img-contain">
            </div>
            
            <nav class="d-flex flex-column gap-1 h-100 pb-3">
                ${this.getNavItems(role, activePage)}

                <div class="mt-auto">
                    <a href="index.html" class="nav-link-custom text-danger flex-center-gap">
                        <i class="bi bi-box-arrow-left fs-5"></i> Salir
                    </a>
                </div>
            </nav>
        </aside>
        `;
    }

    getNavItems(role, activePage) {
        const activeClass = (page) => activePage === page ? 'active' : '';
        
        if (role === 'admin') {
            return `
                <a href="admin_dashboard.html" class="nav-link-custom ${activeClass('dashboard')}"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
                <a href="admin_gestion.html" class="nav-link-custom ${activeClass('gestion')}"><i class="bi bi-clipboard-data me-2"></i> Gestion de Servicios</a>
                <a href="admin_reportes.html" class="nav-link-custom ${activeClass('reportes')}"><i class="bi bi-bar-chart-line me-2"></i> Reportes</a>
                <a href="admin_tecnicos.html" class="nav-link-custom ${activeClass('tecnicos')}"><i class="bi bi-people-fill me-2"></i> Tecnicos</a>
                <a href="admin_configuracion.html" class="nav-link-custom ${activeClass('configuracion')}"><i class="bi bi-gear-fill me-2"></i> Configuración</a>
            `;
        } else if (role === 'tech') {
            return `
                <a href="tech_dashboard.html" class="nav-link-custom ${activeClass('dashboard')}"><i class="bi bi-lightning-charge-fill me-2"></i> Dashboard</a>
                <a href="tech_insertar.html" class="nav-link-custom ${activeClass('insertar')}"><i class="bi bi-plus-circle-fill me-2"></i> Nuevo Reporte</a>
                <a href="tech_modificar.html" class="nav-link-custom ${activeClass('modificar')}"><i class="bi bi-arrow-repeat me-2"></i> Actualizar Estado</a>
                <a href="tech_solicitar.html" class="nav-link-custom ${activeClass('solicitar')}"><i class="bi bi-box-seam-fill me-2"></i> Solicitar</a>
                <a href="tech_consultar.html" class="nav-link-custom ${activeClass('consultar')}"><i class="bi bi-search me-2"></i> Consultar</a>
            `;
        } else {
            return `
                <a href="client_dashboard.html" class="nav-link-custom ${activeClass('dashboard')}">Dashboard</a>
                <a href="client_registrar.html" class="nav-link-custom ${activeClass('registrar')}">Registrar Servicio</a>
                <a href="client_consultar.html" class="nav-link-custom ${activeClass('consultar')}">Servicios Activos</a>
                <a href="client_satisfaccion.html" class="nav-link-custom ${activeClass('satisfaccion')}">Reporte de Satisfacción</a>
                <a href="client_perfil.html" class="nav-link-custom ${activeClass('perfil')}">Mi Perfil</a>
            `;
        }
    }
}
customElements.define('nk-sidebar', NkSidebar);
