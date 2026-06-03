export class NkSidebar extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute('role') || 'client';
        const activePage = this.getAttribute('active') || '';
        
        // 1. Capturamos el contexto dinámico de Java Enterprise (Tomcat)
        const context = this.getAttribute('context') || '';

        this.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-logo">
                <img src="${context}/img/logo.png" alt="Nakeema Logo" class="nk-img-contain">
            </div>
            
            <nav class="d-flex flex-column gap-1 h-100 pb-3">
                ${this.getNavItems(role, activePage, context)}

                <div class="mt-auto">
                    <a href="${context}/index.jsp" class="nav-link-custom text-danger flex-center-gap">
                        <i class="bi bi-box-arrow-left fs-5"></i> Salir
                    </a>
                </div>
            </nav>
        </aside>
        `;
    }

    getNavItems(role, activePage, context) {
        const activeClass = (page) => activePage === page ? 'active' : '';
        
        if (role === 'admin') {
            return `
                <a href="${context}/admin_dashboard.jsp" class="nav-link-custom ${activeClass('dashboard')}"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
                <a href="${context}/admin_gestion.jsp" class="nav-link-custom ${activeClass('gestion')}"><i class="bi bi-clipboard-data me-2"></i> Gestión de Servicios</a>
                <a href="${context}/admin_reportes.jsp" class="nav-link-custom ${activeClass('reportes')}"><i class="bi bi-bar-chart-line me-2"></i> Reportes</a>
                <a href="${context}/admin_tecnicos.jsp" class="nav-link-custom ${activeClass('tecnicos')}"><i class="bi bi-people-fill me-2"></i> Técnicos</a>
                <a href="${context}/admin_configuracion.jsp" class="nav-link-custom ${activeClass('configuracion')}"><i class="bi bi-gear-fill me-2"></i> Configuración</a>
            `;
        } else if (role === 'tech') {
            return `
                <a href="${context}/tech_dashboard.jsp" class="nav-link-custom ${activeClass('dashboard')}"><i class="bi bi-lightning-charge-fill me-2"></i> Dashboard</a>
                <a href="${context}/tech_insertar.jsp" class="nav-link-custom ${activeClass('insertar')}"><i class="bi bi-plus-circle-fill me-2"></i> Nuevo Reporte</a>
                <a href="${context}/tech_modificar.jsp" class="nav-link-custom ${activeClass('modificar')}"><i class="bi bi-arrow-repeat me-2"></i> Actualizar Estado</a>
                <a href="${context}/tech_solicitar.jsp" class="nav-link-custom ${activeClass('solicitar')}"><i class="bi bi-box-seam-fill me-2"></i> Solicitar</a>
                <a href="${context}/tech_consultar.jsp" class="nav-link-custom ${activeClass('consultar')}"><i class="bi bi-search me-2"></i> Consultar</a>
            `;
        } else {
            return `
                <a href="${context}/client_dashboard.jsp" class="nav-link-custom ${activeClass('dashboard')}"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
                <a href="${context}/client_registrar.jsp" class="nav-link-custom ${activeClass('registrar')}"><i class="bi bi-plus-circle-fill me-2"></i> Registrar Servicio</a>
                <a href="${context}/client_consultar.jsp" class="nav-link-custom ${activeClass('consultar')}"><i class="bi bi-clock-history me-2"></i> Servicios Activos</a>
                <a href="${context}/client_satisfaccion.jsp" class="nav-link-custom ${activeClass('satisfaccion')}"><i class="bi bi-emoji-smile-fill me-2"></i> Reporte de Satisfacción</a>
                <a href="${context}/client_perfil.jsp" class="nav-link-custom ${activeClass('perfil')}"><i class="bi bi-person-circle me-2"></i> Mi Perfil</a>
            `;
        }
    }
}
customElements.define('nk-sidebar', NkSidebar);