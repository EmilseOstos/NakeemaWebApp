package com.nakeema.util;

import java.util.regex.Pattern;

public class Validator {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9]{7,15}$");
    private static final Pattern ALPHANUMERIC_PATTERN = Pattern.compile("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ\\s]+$");
    private static final Pattern DANGEROUS_PATTERN = Pattern.compile("[<>\"'%;()&]");

    public static String sanitize(String input) {
        if (input == null) return "";
        return input.trim().replaceAll("<", "&lt;").replaceAll(">", "&gt;")
                .replaceAll("\"", "&quot;").replaceAll("'", "&#x27;")
                .replaceAll("&(?!amp;|lt;|gt;|quot;|#x27;)", "&amp;");
    }

    public static ValidationResult validateRequired(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            return ValidationResult.error(fieldName + " es requerido");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validateEmail(String email) {
        ValidationResult req = validateRequired(email, "Email");
        if (!req.isValid()) return req;
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            return ValidationResult.error("Formato de email inválido");
        }
        if (email.length() > 100) {
            return ValidationResult.error("Email no puede exceder 100 caracteres");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validatePassword(String password) {
        ValidationResult req = validateRequired(password, "Contraseña");
        if (!req.isValid()) return req;
        if (password.length() < 6) {
            return ValidationResult.error("La contraseña debe tener al menos 6 caracteres");
        }
        if (password.length() > 50) {
            return ValidationResult.error("La contraseña no puede exceder 50 caracteres");
        }
        if (DANGEROUS_PATTERN.matcher(password).find()) {
            return ValidationResult.error("La contraseña contiene caracteres no permitidos");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validateUsername(String username) {
        ValidationResult req = validateRequired(username, "Nombre de usuario");
        if (!req.isValid()) return req;
        if (username.length() < 3) {
            return ValidationResult.error("El nombre de usuario debe tener al menos 3 caracteres");
        }
        if (username.length() > 50) {
            return ValidationResult.error("El nombre de usuario no puede exceder 50 caracteres");
        }
        if (DANGEROUS_PATTERN.matcher(username).find()) {
            return ValidationResult.error("El nombre de usuario contiene caracteres no permitidos");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validatePhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return ValidationResult.ok();
        }
        String digits = phone.replaceAll("[\\s\\-()]", "");
        if (!PHONE_PATTERN.matcher(digits).matches()) {
            return ValidationResult.error("Formato de teléfono inválido (debe contener 7-15 dígitos)");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validateTextLength(String value, String fieldName, int min, int max) {
        if (value == null || value.trim().isEmpty()) {
            if (min > 0) {
                return ValidationResult.error(fieldName + " es requerido");
            }
            return ValidationResult.ok();
        }
        if (value.length() < min) {
            return ValidationResult.error(fieldName + " debe tener al menos " + min + " caracteres");
        }
        if (value.length() > max) {
            return ValidationResult.error(fieldName + " no puede exceder " + max + " caracteres");
        }
        if (DANGEROUS_PATTERN.matcher(value).find()) {
            return ValidationResult.error(fieldName + " contiene caracteres no permitidos (< > \" ' % ; &)");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validatePositiveInt(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            return ValidationResult.error(fieldName + " es requerido");
        }
        try {
            int num = Integer.parseInt(value.trim());
            if (num <= 0) {
                return ValidationResult.error(fieldName + " debe ser un número positivo");
            }
        } catch (NumberFormatException e) {
            return ValidationResult.error(fieldName + " debe ser un número válido");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validateDate(String date, String fieldName) {
        if (date == null || date.trim().isEmpty()) {
            return ValidationResult.error(fieldName + " es requerido");
        }
        String dateRegex = "^\\d{4}-\\d{2}-\\d{2}$";
        if (!Pattern.matches(dateRegex, date.trim())) {
            return ValidationResult.error("Formato de " + fieldName + " inválido (use YYYY-MM-DD)");
        }
        try {
            String[] parts = date.split("-");
            int year = Integer.parseInt(parts[0]);
            int month = Integer.parseInt(parts[1]);
            int day = Integer.parseInt(parts[2]);
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                return ValidationResult.error(fieldName + ": fecha inválida");
            }
            if (year < 2020 || year > 2030) {
                return ValidationResult.error(fieldName + ": año fuera de rango (2020-2030)");
            }
        } catch (Exception e) {
            return ValidationResult.error(fieldName + ": fecha inválida");
        }
        return ValidationResult.ok();
    }

    public static ValidationResult validateRol(String rol) {
        if (rol == null || rol.trim().isEmpty()) {
            return ValidationResult.error("El rol es requerido");
        }
        String r = rol.trim().toLowerCase();
        if (!r.equals("admin") && !r.equals("cliente") && !r.equals("tecnico") && !r.equals("client") && !r.equals("tech")) {
            return ValidationResult.error("Rol inválido. Use: admin, cliente o tecnico");
        }
        return ValidationResult.ok();
    }

    public static class ValidationResult {
        private final boolean valid;
        private final String message;

        private ValidationResult(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }

        public static ValidationResult ok() {
            return new ValidationResult(true, null);
        }

        public static ValidationResult error(String message) {
            return new ValidationResult(false, message);
        }

        public boolean isValid() { return valid; }
        public String getMessage() { return message; }
    }
}
