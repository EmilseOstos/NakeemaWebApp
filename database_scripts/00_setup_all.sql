-- =====================================================
-- Script Maestro: Configuración completa de nakeemadb
-- Para la evidencia GA7-220501096-AA3-EV02
-- =====================================================

CREATE DATABASE IF NOT EXISTS nakeemadb;
USE nakeemadb;

-- 1. Tablas del esquema original (inventario/compras)
SOURCE database_scripts/nakeemadb_ciudad.sql;
SOURCE database_scripts/nakeemadb_cliente.sql;
SOURCE database_scripts/nakeemadb_tecnico.sql;
SOURCE database_scripts/nakeemadb_tipo_servicio.sql;
SOURCE database_scripts/nakeemadb_estado_servicio.sql;
SOURCE database_scripts/nakeemadb_sucursal.sql;
SOURCE database_scripts/nakeemadb_servicios.sql;
SOURCE database_scripts/nakeemadb_proveedor.sql;
SOURCE database_scripts/nakeemadb_repuestos.sql;
SOURCE database_scripts/nakeemadb_solicitud.sql;
SOURCE database_scripts/nakeemadb_detalle_solicitud.sql;
SOURCE database_scripts/nakeemadb_compra.sql;
SOURCE database_scripts/nakeemadb_detalle_compra.sql;
SOURCE database_scripts/nakeemadb_entrega.sql;

-- 2. Tablas requeridas por los DAOs de Java (login, CRUD)
SOURCE database_scripts/nakeemadb_usuarios.sql;
SOURCE database_scripts/nakeemadb_clientes.sql;
SOURCE database_scripts/nakeemadb_tecnicos.sql;

-- 3. Verificación
SELECT '✅ Base de datos lista' AS mensaje;
SELECT CONCAT('Usuarios: ', COUNT(*)) AS info FROM usuarios;
SELECT CONCAT('Clientes: ', COUNT(*)) AS info FROM clientes;
SELECT CONCAT('Técnicos: ', COUNT(*)) AS info FROM tecnicos;
