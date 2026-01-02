// ================================
// UTILIDADES DE VALIDACIÓN
// Mejora la seguridad del sistema
// ================================

class ValidationUtils {
    // Validar formato de email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar fortaleza de contraseña
    static validatePassword(password) {
        const errors = [];

        if (password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una mayúscula');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una minúscula');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('La contraseña debe contener al menos un número');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('La contraseña debe contener al menos un carácter especial');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Validar nombre (solo letras y espacios, mínimo 2 caracteres)
    static validateName(name) {
        if (!name || name.trim().length < 2) {
            return {
                isValid: false,
                error: 'El nombre debe tener al menos 2 caracteres'
            };
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
            return {
                isValid: false,
                error: 'El nombre solo puede contener letras y espacios'
            };
        }
        return { isValid: true };
    }

    // Sanitizar entrada de texto (prevenir XSS básico)
    static sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.trim().replace(/[<>]/g, '');
    }

    // Validar que los campos no estén vacíos
    static validateRequired(fields) {
        const errors = [];
        for (const [key, value] of Object.entries(fields)) {
            if (!value || value.trim() === '') {
                errors.push(`El campo ${key} es requerido`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}



