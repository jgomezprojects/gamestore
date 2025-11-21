document.addEventListener("DOMContentLoaded", () => {

    // ================================
    //         REGISTRO
    // ================================
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!name || !email || !password) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            let usuarios = [];
            try {
                usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            } catch {
                console.warn("⚠️ 'usuarios' corrupto — reseteando...");
                localStorage.removeItem("usuarios");
                usuarios = [];
            }

            if (usuarios.some(user => user.email === email)) {
                alert("Este correo ya está registrado.");
                return;
            }

            const nuevoUsuario = { name, email, password };
            usuarios.push(nuevoUsuario);

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        });
    }

    // ================================
    //             LOGIN
    // ================================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            if (usuarios.length === 0) {
                alert("No existen cuentas registradas.");
                return;
            }

            const usuarioValido = usuarios.find(
                user => user.email === email && user.password === password
            );

            if (!usuarioValido) {
                alert("Correo o contraseña incorrectos.");
                return;
            }

            alert("Inicio de sesión exitoso.");

            localStorage.setItem("sesionActiva", "true");
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioValido));

            window.location.href = "index.html";
        });
    }

    // ================================
    //     MOSTRAR USUARIO / ICONO
    // ================================
    const authButtons = document.getElementById("authButtons");
    const userIcon = document.getElementById("userIcon");

    const sesionActiva = localStorage.getItem("sesionActiva");

    if (sesionActiva === "true") {
        if (authButtons) authButtons.style.display = "none";
        if (userIcon) userIcon.style.display = "flex";
    } else {
        if (authButtons) authButtons.style.display = "flex";
        if (userIcon) userIcon.style.display = "none";
    }

    // ================================
    //  USUARIO ACTUAL (SEGURIDAD)
    // ================================
    let usuarioActual = null;
    try {
        usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    } catch {
        console.warn("⚠️ usuarioActual corrupto — reseteando...");
        localStorage.removeItem("usuarioActual");
    }

    const userNameText = document.getElementById("userName");
    if (usuarioActual && userNameText) {
        userNameText.textContent = "👤 " + usuarioActual.name;
    }

    // ================================
    //     MENÚ DESPLEGABLE
    // ================================
    const userMenuBtn = document.getElementById("userMenuBtn");
    const userMenu = document.getElementById("userMenu");

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener("click", () => {
            userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (e) => {
            if (!userMenu.contains(e.target) && e.target !== userMenuBtn) {
                userMenu.style.display = "none";
            }
        });
    }

    // ================================
    //     MODAL CONFIGURACIÓN
    // ================================
    const configModal = document.getElementById("configModal");
    const configuracionBtn = document.getElementById("configuracionBtn");
    const closeConfigBtn = document.getElementById("closeConfigBtn");

    const confName = document.getElementById("confName");
    const confEmail = document.getElementById("confEmail");

    if (configuracionBtn) {
        configuracionBtn.addEventListener("click", () => {
            if (!usuarioActual) return;

            confName.textContent = usuarioActual.name;
            confEmail.textContent = usuarioActual.email;

            configModal.style.display = "flex";
        });
    }

    if (closeConfigBtn) {
        closeConfigBtn.addEventListener("click", () => {
            configModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === configModal) {
            configModal.style.display = "none";
        }
    });

    // ================================
    //             LOGOUT
    // ================================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("sesionActiva");
            localStorage.removeItem("usuarioActual");

            alert("Sesión cerrada exitosamente.");
            window.location.href = "index.html";
        });
    }

});
// ---------------- CAMBIAR CONTRASEÑA ---------------- //

const passwordModal = document.getElementById("passwordModal");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const closePassBtn = document.getElementById("closePassBtn");
const savePassBtn = document.getElementById("savePassBtn");

// Abrir modal
changePasswordBtn.addEventListener("click", () => {
    passwordModal.style.display = "flex"; // CORREGIDO → antes "block"
});

// Cerrar modal
closePassBtn.addEventListener("click", () => {
    passwordModal.style.display = "none";
});

// Guardar nueva contraseña
savePassBtn.addEventListener("click", () => {

    let oldPass = document.getElementById("oldPass").value;
    let newPass = document.getElementById("newPass").value;
    let repeatNewPass = document.getElementById("repeatNewPass").value;

    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuarioActual) {
        alert("Error: No hay usuario activo.");
        return;
    }

    if (oldPass !== usuarioActual.password) {
        alert("La contraseña actual no es correcta.");
        return;
    }

    if (newPass !== repeatNewPass) {
        alert("Las nuevas contraseñas no coinciden.");
        return;
    }

    // Actualizar usuario
    const index = usuarios.findIndex(u => u.email === usuarioActual.email);
    usuarios[index].password = newPass;
    usuarioActual.password = newPass;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

    alert("Contraseña actualizada con éxito.");
    passwordModal.style.display = "none";
});
