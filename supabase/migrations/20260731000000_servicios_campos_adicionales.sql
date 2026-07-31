-- ==========================================
-- Campos adicionales para UX completa en SERVICIOS
-- Agrega datos estructurados de la solicitud y del
-- reporte de trabajo del técnico.
-- ==========================================

ALTER TABLE servicios
    ADD COLUMN IF NOT EXISTS titulo VARCHAR(255),
    ADD COLUMN IF NOT EXISTS categoria VARCHAR(100),
    ADD COLUMN IF NOT EXISTS prioridad VARCHAR(50) DEFAULT 'Media' CHECK (prioridad IN ('Baja', 'Media', 'Alta')),
    ADD COLUMN IF NOT EXISTS direccion TEXT,
    ADD COLUMN IF NOT EXISTS reporte_descripcion TEXT,
    ADD COLUMN IF NOT EXISTS cantidad INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS costo NUMERIC(12, 2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS tiempo NUMERIC(6, 2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS notas_tecnicas TEXT;
