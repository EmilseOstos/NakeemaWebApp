// Web Components
import './components/nk-sidebar.js';
import './components/nk-topbar.js';
import './components/nk-chat-btn.js';

// Features
import { initAuth } from './features/auth.js';
import { initChat } from './features/chat.js';
import { initSidebarToggle } from './features/sidebar-toggle.js';
import { initStorage, applyTheme } from './features/storage.js';

// Initialize storage with mock data on first load
initStorage();

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initChat();
    initSidebarToggle();
    applyTheme();
});
