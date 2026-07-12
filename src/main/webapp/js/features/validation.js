const ValidationRules = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[0-9\s\-()]{7,15}$/,
    alphanumeric: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/,
    dangerousChars: /[<>"';()&%]/,
    dateFormat: /^\d{4}-\d{2}-\d{2}$/
};

function validateField(input, rules) {
    const value = input.value.trim();
    const errors = [];
    const feedback = input.nextElementSibling?.classList.contains('invalid-feedback')
        ? input.nextElementSibling
        : null;

    input.classList.remove('is-invalid', 'is-valid');

    if (rules.required && !value) {
        errors.push(rules.label + ' es requerido');
    } else if (value) {
        if (rules.minLength && value.length < rules.minLength) {
            errors.push(rules.label + ' debe tener al menos ' + rules.minLength + ' caracteres');
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(rules.label + ' no puede exceder ' + rules.maxLength + ' caracteres');
        }
        if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(rules.patternMessage || rules.label + ' tiene un formato inválido');
        }
        if (rules.noDangerous && ValidationRules.dangerousChars.test(value)) {
            errors.push(rules.label + ' contiene caracteres no permitidos');
        }
    }

    if (errors.length > 0) {
        input.classList.add('is-invalid');
        if (feedback) {
            feedback.innerHTML = errors.join('<br>');
            feedback.style.display = 'block';
        } else {
            showFieldError(input, errors.join('. '));
        }
        return false;
    } else {
        input.classList.add('is-valid');
        if (feedback) {
            feedback.style.display = 'none';
        }
        return true;
    }
}

function showFieldError(input, message) {
    const existing = input.parentElement.querySelector('.invalid-feedback');
    if (existing) existing.remove();
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.innerHTML = message;
    feedback.style.display = 'block';
    input.parentElement.appendChild(feedback);
}

function validateForm(formId, fieldRules) {
    const form = document.getElementById(formId);
    if (!form) return true;

    let isValid = true;
    for (const [fieldId, rules] of Object.entries(fieldRules)) {
        const input = document.getElementById(fieldId);
        if (input) {
            if (!validateField(input, rules)) {
                isValid = false;
            }
            input.addEventListener('input', function () {
                validateField(this, rules);
            });
            input.addEventListener('blur', function () {
                validateField(this, rules);
            });
        }
    }
    return isValid;
}

function validateEmail(value) {
    return ValidationRules.email.test(value);
}

function validatePhone(value) {
    const digits = value.replace(/[\s\-()]/g, '');
    return /^\+?\d{7,15}$/.test(digits);
}

function validatePasswordStrength(password) {
    const errors = [];
    if (password.length < 6) errors.push('Mínimo 6 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errors.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errors.push('Al menos un número');
    return errors;
}

function sanitizeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

window.ValidationRules = ValidationRules;
window.validateField = validateField;
window.validateForm = validateForm;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.validatePasswordStrength = validatePasswordStrength;
window.sanitizeHTML = sanitizeHTML;
