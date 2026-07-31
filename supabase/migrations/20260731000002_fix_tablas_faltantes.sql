-- ==========================================
-- FIX PRODUCCIÓN: Tablas faltantes en la BD remota
-- (proveedores, configuracion, satisfaccion no existían en el schema cache)
-- Idempotente: se puede ejecutar múltiples veces sin error.
-- ==========================================

-- ==========================================
-- 1. SATISFACCIÓN
-- ==========================================
CREATE TABLE IF NOT EXISTS satisfaccion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    servicio_id VARCHAR(100) NOT NULL,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    cliente_nombre VARCHAR(255),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. PROVEEDORES
-- ==========================================
CREATE TABLE IF NOT EXISTS proveedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    insumo VARCHAR(255) NOT NULL,
    contacto VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datos semilla de proveedores
INSERT INTO proveedores (nombre, insumo, contacto) VALUES
('Distribuidora Tecnológica S.A.', 'Procesadores Intel', '3001234567'),
('Componentes Globales', 'Tarjetas Madre ASUS', '3109876543'),
('Soluciones IT', 'Discos Duros SSD', '3156789012'),
('Importadora Electronica', 'Memorias RAM Corsair', '3205557777')
ON CONFLICT DO NOTHING;

-- ==========================================
-- 3. CONFIGURACIÓN DEL SISTEMA
-- ==========================================
CREATE TABLE IF NOT EXISTS configuracion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_empresa VARCHAR(255) NOT NULL DEFAULT 'Nakeema Corp',
    correo_contacto VARCHAR(255) NOT NULL DEFAULT 'admin@nakeema.com',
    direccion TEXT,
    logo_url TEXT,
    modo_oscuro BOOLEAN NOT NULL DEFAULT FALSE,
    notificaciones_correo BOOLEAN NOT NULL DEFAULT TRUE,
    alertas_sms BOOLEAN NOT NULL DEFAULT FALSE,
    auto_asignar_servicios BOOLEAN NOT NULL DEFAULT TRUE,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configuración por defecto
INSERT INTO configuracion (nombre_empresa, correo_contacto, direccion)
VALUES ('Nakeema Corp', 'admin@nakeema.com', 'Calle Falsa 123, Ciudad de México')
ON CONFLICT DO NOTHING;
