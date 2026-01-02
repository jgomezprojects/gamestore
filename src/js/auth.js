document.addEventListener("DOMContentLoaded", () => {

    // ================================
    //         REGISTRO
    // ================================
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = ValidationUtils.sanitizeInput(document.getElementById("registerName").value);
            const email = ValidationUtils.sanitizeInput(document.getElementById("registerEmail").value);
            const password = document.getElementById("registerPassword").value;

            // Validar campos requeridos
            const requiredValidation = ValidationUtils.validateRequired({ nombre: name, email: email, contraseña: password });
            if (!requiredValidation.isValid) {
                notifications.error(requiredValidation.errors[0]);
                return;
            }

            // Validar nombre
            const nameValidation = ValidationUtils.validateName(name);
            if (!nameValidation.isValid) {
                notifications.error(nameValidation.error);
                return;
            }

            // Validar email
            if (!ValidationUtils.isValidEmail(email)) {
                notifications.error("Por favor, ingresa un email válido.");
                return;
            }

            // Validar contraseña
            const passwordValidation = ValidationUtils.validatePassword(password);
            if (!passwordValidation.isValid) {
                notifications.error(passwordValidation.errors[0]);
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
                notifications.error("Este correo ya está registrado.");
                return;
            }

            const nuevoUsuario = { name, email, password };
            usuarios.push(nuevoUsuario);

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            notifications.success("Registro exitoso. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ================================
    //             LOGIN
    // ================================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = ValidationUtils.sanitizeInput(document.getElementById("loginEmail").value);
            const password = document.getElementById("loginPassword").value;

            // Validar campos requeridos
            const requiredValidation = ValidationUtils.validateRequired({ email: email, contraseña: password });
            if (!requiredValidation.isValid) {
                notifications.error(requiredValidation.errors[0]);
                return;
            }

            // Validar formato de email
            if (!ValidationUtils.isValidEmail(email)) {
                notifications.error("Por favor, ingresa un email válido.");
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

            if (usuarios.length === 0) {
                notifications.warning("No existen cuentas registradas. Por favor, regístrate primero.");
                return;
            }

            const usuarioValido = usuarios.find(
                user => user.email === email && user.password === password
            );

            if (!usuarioValido) {
                notifications.error("Correo o contraseña incorrectos.");
                return;
            }

            notifications.success("Inicio de sesión exitoso. Bienvenido!");

            localStorage.setItem("sesionActiva", "true");
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioValido));

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
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
            if (!usuarioActual) {
                notifications.warning("No hay sesión activa. Por favor, inicia sesión.");
                return;
            }

            confName.textContent = usuarioActual.name;
            confEmail.textContent = usuarioActual.email;

            configModal.classList.add("active");
            configModal.style.display = "flex";
        });
    }

    if (closeConfigBtn) {
        closeConfigBtn.addEventListener("click", () => {
            configModal.classList.remove("active");
            configModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === configModal) {
            configModal.classList.remove("active");
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

            notifications.success("Sesión cerrada exitosamente.");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        });
    }

    // ---------------- CAMBIAR CONTRASEÑA ---------------- //
    const passwordModal = document.getElementById("passwordModal");
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const closePassBtn = document.getElementById("closePassBtn");
    const savePassBtn = document.getElementById("savePassBtn");

    // Abrir modal
    if (changePasswordBtn && passwordModal) {
        changePasswordBtn.addEventListener("click", () => {
            passwordModal.classList.add("active");
            passwordModal.style.display = "flex";
        });
    }

    // Cerrar modal
    if (closePassBtn && passwordModal) {
        closePassBtn.addEventListener("click", () => {
            passwordModal.classList.remove("active");
            passwordModal.style.display = "none";
            // Limpiar campos al cerrar
            document.getElementById("oldPass").value = "";
            document.getElementById("newPass").value = "";
            document.getElementById("repeatNewPass").value = "";
        });
    }

    // Cerrar modal al hacer clic fuera
    if (passwordModal) {
        window.addEventListener("click", (e) => {
            if (e.target === passwordModal) {
                passwordModal.classList.remove("active");
                passwordModal.style.display = "none";
                // Limpiar campos al cerrar
                document.getElementById("oldPass").value = "";
                document.getElementById("newPass").value = "";
                document.getElementById("repeatNewPass").value = "";
            }
        });
    }

    // Guardar nueva contraseña
    if (savePassBtn) {
        savePassBtn.addEventListener("click", () => {
            let oldPass = document.getElementById("oldPass").value;
            let newPass = document.getElementById("newPass").value;
            let repeatNewPass = document.getElementById("repeatNewPass").value;

            let usuarioActual = null;
            try {
                usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
            } catch {
                console.warn("Error al leer usuarioActual");
            }

            let usuarios = [];
            try {
                usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            } catch {
                usuarios = [];
            }

            if (!usuarioActual) {
                notifications.error("Error: No hay usuario activo. Por favor, inicia sesión nuevamente.");
                return;
            }

            // Validar campos requeridos
            const requiredValidation = ValidationUtils.validateRequired({ 
                'contraseña actual': oldPass, 
                'nueva contraseña': newPass, 
                'repetir contraseña': repeatNewPass 
            });
            if (!requiredValidation.isValid) {
                notifications.error(requiredValidation.errors[0]);
                return;
            }

            if (oldPass !== usuarioActual.password) {
                notifications.error("La contraseña actual no es correcta.");
                return;
            }

            if (newPass !== repeatNewPass) {
                notifications.error("Las nuevas contraseñas no coinciden.");
                return;
            }

            // Validar que la nueva contraseña sea diferente a la actual
            if (oldPass === newPass) {
                notifications.warning("La nueva contraseña debe ser diferente a la actual.");
                return;
            }

            // Validar fortaleza de la nueva contraseña
            const passwordValidation = ValidationUtils.validatePassword(newPass);
            if (!passwordValidation.isValid) {
                notifications.error(passwordValidation.errors[0]);
                return;
            }

            // Actualizar usuario
            const index = usuarios.findIndex(u => u.email === usuarioActual.email);
            if (index !== -1) {
                usuarios[index].password = newPass;
                usuarioActual.password = newPass;

                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

                notifications.success("Contraseña actualizada con éxito.");
                if (passwordModal) {
                    passwordModal.classList.remove("active");
                    passwordModal.style.display = "none";
                }
                
                // Limpiar campos
                document.getElementById("oldPass").value = "";
                document.getElementById("newPass").value = "";
                document.getElementById("repeatNewPass").value = "";
            } else {
                notifications.error("Error al actualizar la contraseña. Intenta nuevamente.");
            }
        });
    }
});
