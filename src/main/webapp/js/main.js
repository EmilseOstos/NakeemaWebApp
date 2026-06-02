// Web Components
import './components/nk-sidebar.js';
import './components/nk-topbar.js';
import './components/nk-chat-btn.js';

// Features
import { initAuth } from './features/auth.js?v=2';
import { initChat } from './features/chat.js';
import { initSidebarToggle } from './features/sidebar-toggle.js';
import { initStorage, applyTheme } from './features/storage.js';

// --- FUNCIONES GLOBALES PARA QUE EL HTML LAS PUEDA LLAMAR ---
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

// --- INICIALIZACIÓN ---
initStorage();

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initChat();
    initSidebarToggle();
    applyTheme();

    // Comprobación de parámetros en la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('registro') === 'ok') {
        console.log("Detectado registro exitoso, cambiando vista...");
        window.toggleAuthSection('successSection');
    } else if (urlParams.get('error') === 'registro_fallido') {
        alert('Hubo un error al registrar tu cuenta.');
        window.toggleAuthSection('registerSection');
    }
});