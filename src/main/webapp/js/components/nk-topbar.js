export class NkTopbar extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute('role') || 'client';
        const userName = this.getAttribute('username') || 'Usuario';
        
        let roleText = 'Cliente';
        if(role === 'admin') roleText = 'Administrador';
        if(role === 'tech') roleText = 'Técnico';

        // Dynamic notifications from storage
        const notifs = (window.nkStorage && window.nkStorage.getNotifications) ? window.nkStorage.getNotifications() : [];
        const unreadCount = notifs.filter(n => !n.read).length;
        const displayNotifs = notifs.slice(0, 5);

        const notifItems = displayNotifs.length > 0 
            ? displayNotifs.map(n => `
                <li><a class="dropdown-item py-2 ${n.read ? '' : 'bg-light'}" href="#" onclick="if(window.nkStorage){window.nkStorage.markNotifRead(${n.id})}">
                    <div class="fw-600 fs-13">${n.title}</div>
                    <div class="text-muted fs-11">${n.time}</div>
                </a></li>
            `).join('')
            : '<li><a class="dropdown-item py-2 text-center text-muted fs-13" href="#">Sin notificaciones</a></li>';

        const badgeHTML = unreadCount > 0 
            ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:10px;">${unreadCount}</span>`
            : '';

        const notificationsHTML = `
            <div class="position-relative dropstart cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell-fill fs-5 text-nk-muted"></i>
                ${badgeHTML}
            </div>
            <ul class="dropdown-menu shadow-sm notif-dropdown-custom">
                <li class="px-3 py-2 border-bottom fw-bold notif-header-custom d-flex justify-content-between align-items-center">
                    <span>Notificaciones</span>
                    ${unreadCount > 0 ? '<a href="#" class="text-nk-primary fs-11 text-decoration-none" onclick="if(window.nkStorage){window.nkStorage.markAllNotifsRead();location.reload();}">Marcar todas</a>' : ''}
                </li>
                ${notifItems}
                <li><hr class="dropdown-divider mb-0 mt-1"></li>
                <li><a class="dropdown-item py-2 text-center text-nk-primary fw-600 fs-12" href="#">Ver todas</a></li>
            </ul>
        `;

        if (role === 'admin') {
            this.innerHTML = `
            <header class="topbar">
                <div class="search-bar">
                    <i class="bi bi-search"></i>
                    <input type="text" placeholder="${roleText}">
                </div>
                
                <div class="d-flex align-items-center gap-4 pe-3">
                    ${notificationsHTML}
                    <div class="user-profile cursor-pointer">
                        <div class="user-info">
                            <div class="user-name">${userName}</div>
                        </div>
                        <div class="avatar">
                            <i class="bi bi-person"></i>
                        </div>
                    </div>
                </div>
            </header>
            `;
        } else {
            this.innerHTML = `
            <div class="position-absolute end-0 top-0 p-4 z-3 w-100" style="pointer-events: none;">
                <div class="d-flex align-items-center justify-content-end gap-4" style="pointer-events: auto;">
                    ${notificationsHTML}
                    <div class="d-flex align-items-center gap-2">
                        <div class="text-end line-height-1">
                            <div class="fs-12 fw-600">${userName}</div>
                            <div class="fs-10 text-nk-muted">${roleText}</div>
                        </div>
                        <div class="avatar icon-action-circle bg-white text-dark shadow-sm" style="width: 35px; height: 35px;">
                            <i class="bi bi-person-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
}
customElements.define('nk-topbar', NkTopbar);
