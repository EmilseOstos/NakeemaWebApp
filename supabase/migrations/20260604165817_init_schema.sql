-- Habilitar extensión para UUIDs (Recomendado en Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. ROLES
-- ==========================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

-- Insertar roles base del sistema
INSERT INTO roles (nombre, descripcion) VALUES 
('Cliente', 'Usuario que solicita los servicios'),
('Tecnico', 'Personal encargado de ejecutar las órdenes de servicio'),
('Administrador', 'Administrador con control total del sistema');

-- ==========================================
-- 2. USUARIOS (Sustituye a la antigua clase Usuario.java)
-- ==========================================
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. CLIENTES (Sustituye a Cliente.java, enlazado a Usuario)
-- ==========================================
CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    direccion TEXT,
    estado VARCHAR(50) DEFAULT 'Activo'
);

-- ==========================================
-- 4. TÉCNICOS (Sustituye a Tecnico.java, enlazado a Usuario)
-- ==========================================
CREATE TABLE tecnicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    especialidad VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'Disponible'
);

-- ==========================================
-- 5. SERVICIOS / ÓRDENES (Sustituye a Servicio.java)
-- ==========================================
CREATE TABLE servicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    tecnico_id UUID REFERENCES tecnicos(id) ON DELETE SET NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendiente', -- Pendiente, En progreso, Finalizado, Cancelado
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_completado TIMESTAMP WITH TIME ZONE
);

-- ==========================================
-- 6. INVENTARIO (Nuevo módulo solicitado)
-- ==========================================
CREATE TABLE inventario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    cantidad INTEGER NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
    unidad_medida VARCHAR(50) NOT NULL,
    ultima_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 7. CHAT (Nuevo módulo solicitado)
-- ==========================================
CREATE TABLE chat_mensajes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    servicio_id UUID REFERENCES servicios(id) ON DELETE CASCADE,
    remitente_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 8. SATISFACCIÓN (Nuevo módulo)
-- ==========================================
CREATE TABLE satisfaccion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    servicio_id VARCHAR(100) NOT NULL,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    cliente_nombre VARCHAR(255),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 9. PROVEEDORES
-- ==========================================
CREATE TABLE proveedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    insumo VARCHAR(255) NOT NULL,
    contacto VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 10. CONFIGURACIÓN DEL SISTEMA
-- ==========================================
CREATE TABLE configuracion (
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

-- Insertar configuración por defecto
INSERT INTO configuracion (nombre_empresa, correo_contacto, direccion)
VALUES ('Nakeema Corp', 'admin@nakeema.com', 'Calle Falsa 123, Ciudad de México');
