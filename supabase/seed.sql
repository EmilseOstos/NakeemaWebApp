-- Seed data for development
INSERT INTO roles (nombre, descripcion) VALUES
('Cliente', 'Usuario que solicita los servicios'),
('Tecnico', 'Personal encargado de ejecutar las órdenes de servicio'),
('Administrador', 'Administrador con control total del sistema')
ON CONFLICT (nombre) DO NOTHING;

-- Password: "123456" hashed with bcryptjs
INSERT INTO usuarios (username, email, password_hash, rol_id) VALUES
('admin', 'admin@nakeema.com', '$2b$10$TdA5CEk9MOgvCX1DuFFVzeHfZQxT3ZqRZwmZgCQZSorZnykUdwOfK', (SELECT id FROM roles WHERE nombre = 'Administrador')),
('tecnico', 'tecnico@nakeema.com', '$2b$10$TdA5CEk9MOgvCX1DuFFVzeHfZQxT3ZqRZwmZgCQZSorZnykUdwOfK', (SELECT id FROM roles WHERE nombre = 'Tecnico')),
('cliente', 'cliente@nakeema.com', '$2b$10$TdA5CEk9MOgvCX1DuFFVzeHfZQxT3ZqRZwmZgCQZSorZnykUdwOfK', (SELECT id FROM roles WHERE nombre = 'Cliente'))
ON CONFLICT (email) DO NOTHING;

INSERT INTO tecnicos (usuario_id, nombre, telefono, especialidad, estado) VALUES
((SELECT id FROM usuarios WHERE email = 'tecnico@nakeema.com'), 'Kelly Ramirez', '+57 312 987 6543', 'Soporte Técnico Nivel 2', 'Disponible')
ON CONFLICT (usuario_id) DO NOTHING;

INSERT INTO clientes (usuario_id, nombre, telefono, direccion, estado) VALUES
((SELECT id FROM usuarios WHERE email = 'cliente@nakeema.com'), 'Emilse Ostos', '+57 320 123 4567', 'Av. Principal 456, Bogotá', 'Activo')
ON CONFLICT (usuario_id) DO NOTHING;

INSERT INTO inventario (nombre, descripcion, cantidad, unidad_medida) VALUES
('Cable 12AWG', 'Cable eléctrico calibre 12', 50, 'metros'),
('Conectores RJ45', 'Conectores para redes CAT6', 100, 'unidades'),
('Fusibles 10A', 'Fusibles de protección', 30, 'unidades')
ON CONFLICT DO NOTHING;

INSERT INTO proveedores (nombre, insumo, contacto) VALUES
('Distribuidora Tecnológica S.A.', 'Procesadores Intel', '3001234567'),
('Componentes Globales', 'Tarjetas Madre ASUS', '3109876543'),
('Soluciones IT', 'Discos Duros SSD', '3156789012'),
('Importadora Electronica', 'Memorias RAM Corsair', '3205557777')
ON CONFLICT DO NOTHING;
