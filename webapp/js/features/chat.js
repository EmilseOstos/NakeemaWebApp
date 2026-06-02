export function initChat() {
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message === "") return;

            // Get current time
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const strTime = hours + ':' + minutes + ' ' + ampm;

            // Create User Message Element
            const msgDiv = document.createElement("div");
            msgDiv.className = "d-flex flex-column align-items-end mb-4 w-100";
            msgDiv.innerHTML = `
                <div class="d-flex align-items-end justify-content-end mb-1 w-100">
                    <span class="text-muted me-2 fs-11">${strTime}</span>
                    <span class="fw-bold fs-6 text-nk-muted">Tú</span>
                </div>
                <div class="msg-bubble msg-user shadow-sm max-w-80">
                    ${message}
                </div>
            `;
            
            chatMessages.appendChild(msgDiv);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate Bot Response
            setTimeout(() => {
                const botTime = new Date();
                let bHours = botTime.getHours();
                let bMinutes = botTime.getMinutes();
                const bAmpm = bHours >= 12 ? 'pm' : 'am';
                bHours = bHours % 12;
                bHours = bHours ? bHours : 12; 
                bMinutes = bMinutes < 10 ? '0' + bMinutes : bMinutes;
                const bStrTime = bHours + ':' + bMinutes + ' ' + bAmpm;

                const botDiv = document.createElement("div");
                botDiv.className = "d-flex gap-3 mb-4";
                botDiv.innerHTML = `
                    <div class="avatar shadow-sm flex-shrink-0 icon-avatar-35 bg-nk-primary text-white">
                        <i class="bi bi-robot"></i>
                    </div>
                    <div class="w-100">
                        <div class="d-flex align-items-end mb-1">
                            <span class="fw-bold fs-6 text-nk-muted">Sarah James</span>
                            <span class="text-muted ms-2 fs-11">${bStrTime}</span>
                        </div>
                        <div class="msg-bubble msg-bot shadow-sm">
                            Estoy procesando tu solicitud, dame un momento por favor.
                        </div>
                    </div>
                `;
                chatMessages.appendChild(botDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }
}
