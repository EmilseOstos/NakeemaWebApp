export function initSidebarToggle() {
    // ---- Mobile Sidebar Toggle ----
    // Wait slightly to ensure Web Components have rendered their internal HTML
    setTimeout(() => {
        const sidebar = document.querySelector('.sidebar');
        // Only initialize if sidebar exists and toggle hasn't been added yet
        if (sidebar && !document.querySelector('.sidebar-toggle')) {
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'sidebar-toggle';
            toggleBtn.setAttribute('aria-label', 'Abrir menú');
            toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
            document.body.appendChild(toggleBtn);

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);

            const openSidebar = () => {
                sidebar.classList.add('open');
                overlay.classList.add('active');
                toggleBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
            };

            const closeSidebar = () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
            };

            toggleBtn.addEventListener('click', () => {
                sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
            });

            overlay.addEventListener('click', closeSidebar);

            // Close on nav click (mobile)
            sidebar.querySelectorAll('.nav-link-custom').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) closeSidebar();
                });
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeSidebar();
            });

            // Swipe-to-close gesture
            let touchStartX = 0;
            sidebar.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            sidebar.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (diff > 60) closeSidebar();
            }, { passive: true });
        }
    }, 100);
}
