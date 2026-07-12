# Nakeema Web App

Plataforma web integral para la gestión de servicios técnicos, atención al cliente, administración de técnicos y generación de reportes. Desarrollada con **Java (Jakarta EE)** bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** y empaquetada con **Apache Maven**.

## Tecnologías Empleadas

| Capa | Tecnología |
|------|-----------|
| **Lenguaje** | Java 17 |
| **Framework** | Jakarta Servlet API 6.0 (Jakarta EE) |
| **Servidor** | Apache Tomcat 11 |
| **Base de Datos** | MySQL / MariaDB |
| **Conector BD** | MySQL Connector/J 8.3.0 |
| **Serialización JSON** | Gson 2.10.1 |
| **Construcción** | Apache Maven (empaquetado WAR) |
| **Frontend** | JSP, HTML5, CSS3, JavaScript, Bootstrap 5.3 |
| **Versionamiento** | Git & GitHub |

## Arquitectura del Proyecto (MVC)

```
NakeemaWebApp/
├── pom.xml                          # Configuración Maven y dependencias
├── database_scripts/                # Scripts SQL para crear la base de datos
│   ├── nakeemadb_ciudad.sql
│   ├── nakeemadb_cliente.sql
│   ├── nakeemadb_compra.sql
│   ├── nakeemadb_tecnico.sql
│   ├── nakeemadb_servicios.sql
│   └── ... (14 tablas en total)
└── src/main/
    ├── java/com/nakeema/
    │   ├── conexion/                # Capa de conexión JDBC a la base de datos
    │   │   └── Conexion.java
    │   ├── modelo/                  # Capa Modelo - POJOs / Entidades
    │   │   ├── Usuario.java
    │   │   ├── Cliente.java
    │   │   ├── Tecnico.java
    │   │   └── Servicio.java
    │   ├── dao/                     # Capa DAO - Acceso a datos (CRUD)
    │   │   ├── UsuarioDAO.java
    │   │   ├── ClienteDAO.java
    │   │   ├── TecnicoDAO.java
    │   │   └── ServicioDAO.java
    │   └── controlador/             # Capa Controlador - Servlets HTTP
    │       ├── LoginServlet.java
    │       ├── LogoutServlet.java
    │       ├── RegistroServlet.java
    │       ├── ClienteServlet.java
    │       ├── TecnicoServlet.java
    │       ├── ServicioServlet.java
    │       └── TestServlet.java
    └── webapp/                      # Capa Vista - Interfaz de usuario
        ├── WEB-INF/web.xml          # Descriptor de despliegue Jakarta EE
        ├── index.jsp                # Página de inicio / Login
        ├── css/styles.css           # Estilos globales
        ├── js/                      # Lógica frontend
        │   ├── main.js
        │   ├── components/          # Componentes reutilizables (sidebar, topbar, chat)
        │   └── features/            # Módulos funcionales (auth, chat, storage)
        ├── img/logo.png             # Logo corporativo
        ├── admin_dashboard.jsp      # Panel administrador
        ├── admin_gestion.jsp        # Gestión administrativa
        ├── admin_reportes.jsp       # Reportes gerenciales
        ├── admin_tecnicos.jsp       # Directorio de técnicos
        ├── client_dashboard.jsp     # Panel del cliente
        ├── client_registrar.jsp     # Registro de clientes
        ├── client_consultar.jsp     # Consulta de servicios
        ├── tech_dashboard.jsp       # Panel del técnico
        ├── tech_insertar.jsp        # Alta de servicios técnicos
        ├── tech_consultar.jsp       # Consulta de servicios asignados
        └── tech_modificar.jsp       # Actualización de servicios
```

## Módulos Funcionales

- **Autenticación:** Login y registro de usuarios con validación por rol (admin, técnico, cliente).
- **Gestión de Clientes:** CRUD completo (crear, leer, actualizar, eliminar) vía API REST con Servlets.
- **Gestión de Técnicos:** Administración del directorio de técnicos y asignación de servicios.
- **Gestión de Servicios:** Registro, seguimiento y actualización de estados de servicios técnicos.
- **Reportes:** Visualización de reportes gerenciales y estadísticas.
- **Soporte:** Chat de soporte técnico integrado.

## Requisitos Previos

- **Java JDK 17** o superior
- **Apache Maven 3.8+**
- **Apache Tomcat 11**
- **MySQL / MariaDB** (incluido en XAMPP)

## Instalación y Despliegue Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/EmilseOstos/NakeemaWebApp.git
cd NakeemaWebApp
```

### 2. Crear la base de datos
Iniciar MySQL (por ejemplo con XAMPP) y crear la base de datos `nakeemadb`. Luego importar los scripts SQL ubicados en la carpeta `database_scripts/`:
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS nakeemadb;"
mysql -u root nakeemadb < database_scripts/nakeemadb_ciudad.sql
mysql -u root nakeemadb < database_scripts/nakeemadb_cliente.sql
# ... importar el resto de archivos .sql
```

### 3. Compilar el proyecto
```bash
mvn clean package
```
Esto genera el archivo `target/nakeema-webapp.war`.

### 4. Desplegar en Tomcat
Copiar el archivo `nakeema-webapp.war` a la carpeta `webapps/` de Apache Tomcat 11 e iniciar el servidor.

### 5. Acceder a la aplicación
Abrir el navegador en: **http://localhost:8080/nakeema-webapp**

---

## Validaciones Implementadas

### Backend (Java - Validator.java)
- **Campos requeridos**: Todos los campos obligatorios validados antes del procesamiento.
- **Email**: Validación de formato con regex (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).
- **Contraseña**: Longitud mínima de 6 caracteres, máxima de 50, sin caracteres peligrosos.
- **Teléfono**: Formato numérico de 7 a 15 dígitos (con o sin prefijo +).
- **Longitudes**: Mínimas y máximas en todos los campos de texto.
- **Caracteres peligrosos**: Rechazo de `< > " ' % ; ( ) &` para prevenir XSS.
- **Fechas**: Validación de formato ISO (YYYY-MM-DD), rango de años (2020-2030), valores de mes/día.
- **Números positivos**: IDs, cantidades y costos validados como enteros positivos.
- **Roles**: Validación contra lista blanca (admin, cliente, tecnico, client, tech).
- **Sanitización HTML**: Escape de `< > " ' &` en todos los outputs.

### Frontend (JavaScript - validation.js)
- Validación en tiempo real con feedback visual (clases `is-valid`/`is-invalid` de Bootstrap).
- Validación de formularios completos antes del envío.
- Prevención de XSS mediante sanitización de caracteres peligrosos.
- Validación de fortaleza de contraseña (mayúsculas, minúsculas, números).
- Reglas de validación configurables por campo (required, minLength, maxLength, pattern, noDangerous).

### Seguridad
- **SQL Injection**: Prevenido mediante PreparedStatement en todas las consultas JDBC.
- **XSS**: Sanitización de HTML en backend y frontend.
- **Control de acceso**: Verificación de sesión y rol en cada JSP protegido.
- **CSRF**: Sesión HTTP con atributos para identificación segura.

## Estándares de Codificación

- Nomenclatura de clases en **PascalCase** (`ClienteServlet`, `UsuarioDAO`).
- Nomenclatura de métodos y variables en **camelCase** (`obtenerPorId`, `validarLogin`).
- Paquetes organizados por responsabilidad: `modelo`, `dao`, `controlador`, `conexion`.
- Código documentado con comentarios descriptivos en cada método.
- Patrón DAO para separación de la lógica de acceso a datos.
- API RESTful con respuestas en formato JSON.

---

© 2026 Nakeema - Todos los derechos reservados.
