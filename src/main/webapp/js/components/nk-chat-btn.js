export class NkChatBtn extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <a href="support_chat.html" class="floating-chat-btn text-decoration-none" style="z-index: 1000;" aria-label="Abrir Chat de Soporte">
            <i class="bi bi-chat-dots-fill"></i>
        </a>
        `;
    }
}
customElements.define('nk-chat-btn', NkChatBtn);
