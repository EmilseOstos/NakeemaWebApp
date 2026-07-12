#!/bin/bash
# =====================================================
# Script de Configuración de Base de Datos
# Para la evidencia GA7-220501096-AA3-EV02
# Uso: bash database_scripts/setup_db.sh
# =====================================================

# Colores para output
VERDE='\033[0;32m'
ROJO='\033[0;31m'
AMARILLO='\033[1;33m'
NC='\033[0m'

echo -e "${AMARILLO}============================================${NC}"
echo -e "${AMARILLO}  Configuración de Base de Datos - Nakeema${NC}"
echo -e "${AMARILLO}============================================${NC}"

# Detectar ruta de MySQL (XAMPP o sistema)
if [ -f "/opt/lampp/bin/mysql" ]; then
    MYSQL="/opt/lampp/bin/mysql"
    echo -e "${VERDE}✔ Usando MySQL de XAMPP${NC}"
elif command -v mysql &>/dev/null; then
    MYSQL="mysql"
    echo -e "${VERDE}✔ Usando MySQL del sistema${NC}"
else
    echo -e "${ROJO}✘ MySQL no encontrado. Instala XAMPP o MySQL.${NC}"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "\n${AMARILLO}[1/5] Creando base de datos 'nakeemadb'...${NC}"
$MYSQL -u root -e "CREATE DATABASE IF NOT EXISTS nakeemadb;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${VERDE}  ✔ Base de datos creada${NC}"
else
    echo -e "${ROJO}  ✘ Error al crear la BD. ¿MySQL está corriendo?${NC}"
    echo -e "${AMARILLO}  → Ejecuta: sudo /opt/lampp/lampp start${NC}"
    exit 1
fi

echo -e "\n${AMARILLO}[2/5] Importando tablas del esquema original (14 tablas)...${NC}"
for script in \
    nakeemadb_ciudad.sql \
    nakeemadb_cliente.sql \
    nakeemadb_tecnico.sql \
    nakeemadb_tipo_servicio.sql \
    nakeemadb_estado_servicio.sql \
    nakeemadb_sucursal.sql \
    nakeemadb_servicios.sql \
    nakeemadb_proveedor.sql \
    nakeemadb_repuestos.sql \
    nakeemadb_solicitud.sql \
    nakeemadb_detalle_solicitud.sql \
    nakeemadb_compra.sql \
    nakeemadb_detalle_compra.sql \
    nakeemadb_entrega.sql; do
    echo -e "  Importando ${script}..."
    $MYSQL -u root nakeemadb < "$SCRIPT_DIR/$script" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${VERDE}    ✔ OK${NC}"
    else
        echo -e "${ROJO}    ✘ Error${NC}"
    fi
done

echo -e "\n${AMARILLO}[3/5] Importando tablas para módulos Java (login, CRUD)...${NC}"
for script in \
    nakeemadb_usuarios.sql \
    nakeemadb_clientes.sql \
    nakeemadb_tecnicos.sql; do
    echo -e "  Importando ${script}..."
    $MYSQL -u root nakeemadb < "$SCRIPT_DIR/$script" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${VERDE}    ✔ OK${NC}"
    else
        echo -e "${ROJO}    ✘ Error${NC}"
    fi
done

echo -e "\n${AMARILLO}[4/5] Verificando datos...${NC}"
$MYSQL -u root nakeemadb -e "
    SELECT 'USUARIOS' AS tabla, COUNT(*) AS registros FROM usuarios
    UNION ALL
    SELECT 'CLIENTES', COUNT(*) FROM clientes
    UNION ALL
    SELECT 'TECNICOS', COUNT(*) FROM tecnicos;
" 2>/dev/null

echo -e "\n${AMARILLO}[5/5] Mostrando usuarios registrados...${NC}"
$MYSQL -u root nakeemadb -e "
    SELECT id, username, email, rol FROM usuarios;
" 2>/dev/null

echo -e "\n${VERDE}============================================${NC}"
echo -e "${VERDE}  ✅ Base de datos lista para usar${NC}"
echo -e "${VERDE}============================================${NC}"
echo -e ""
echo -e "Credenciales de prueba:"
echo -e "  ADMIN:   admin / 123456"
echo -e "  CLIENTE: cliente1 / 123456"
echo -e "  TÉCNICO: tecnico1 / 123456"
echo -e ""
echo -e "Luego compila y despliega:"
echo -e "  cd $(dirname "$SCRIPT_DIR")"
echo -e "  mvn clean package"
echo -e "  cp target/nakeema-webapp.war /ruta/a/tomcat/webapps/"
echo -e "  http://localhost:8080/nakeema-webapp"
echo -e ""
