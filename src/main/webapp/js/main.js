import './components/nk-sidebar.js';
import './components/nk-topbar.js';
import './components/nk-chat-btn.js';

import { initAuth } from './features/auth.js?v=2';
import { initChat } from './features/chat.js';
import { initSidebarToggle } from './features/sidebar-toggle.js';
import { initStorage, applyTheme } from './features/storage.js';
import './features/validation.js';

window.toggleAuthSection = function(sectionId) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('forgotSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
    }
};

window.togglePassword = function(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        input.type = 'password';
        iconElement.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
};

initStorage();

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initChat();
    initSidebarToggle();
    applyTheme();

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('registro') === 'exitoso') {
        window.toggleAuthSection('successSection');
    } else if (urlParams.get('error')) {
        const errorMsg = urlParams.get('error');
        const form = urlParams.get('form');
        if (form === 'register') {
            window.toggleAuthSection('registerSection');
        }
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = decodeURIComponent(errorMsg);
            errorDiv.style.display = 'block';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
        } else {
            alert(decodeURIComponent(errorMsg));
        }
    }
});
