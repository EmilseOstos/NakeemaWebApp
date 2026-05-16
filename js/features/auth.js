export function initAuth() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const role = document.getElementById("userRole").value;
            if (role === "admin") {
                window.location.href = "admin_dashboard.html";
            } else if (role === "client") {
                window.location.href = "client_dashboard.html";
            } else if (role === "tech") {
                window.location.href = "tech_dashboard.html";
            }
        });
    }
}
