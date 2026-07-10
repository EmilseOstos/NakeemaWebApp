# PORTADA

**Informe: Montaje y Despliegue Local de Servidor de Aplicaciones**
**Evidencia:** GA10-220501097-AA3-EV01 - Software instalado en la plataforma del cliente.

**Presentado por:** [Tu Nombre / Marlon de la Roche]
**Programa de Formación:** Análisis y Desarrollo de Software (ADSO)
**Ficha:** [Número de tu ficha]
**Instructor:** [Nombre de tu instructor]

**Servicio Nacional de Aprendizaje - SENA**
**[Ciudad], [Año]**

---

## 1. INTRODUCCIÓN

El despliegue de aplicaciones web requiere de un entorno de servidor que permita procesar y servir los archivos (HTML, CSS, JavaScript) a los clientes a través del protocolo HTTP. En el desarrollo de software, antes de llevar una aplicación a un servidor en la nube (producción), es estrictamente necesario realizar pruebas en un entorno controlado conocido como servidor local. 

Este documento detalla el paso a paso del montaje de un servidor de aplicaciones local utilizando **[Elegir: XAMPP (Apache) o Node.js (http-server)]** como plataforma de implantación. Para validar el correcto funcionamiento del servidor, se realizó el despliegue de una plantilla web HTML gratuita obtenida de internet, simulando el proceso real de instalación de software en la plataforma de un cliente.

---

## 2. SELECCIÓN DE PLATAFORMAS

*   **Plataforma de desarrollo / Servidor Local:** Se seleccionó **XAMPP** (que incluye el servidor web Apache) / **Node.js** (usando el paquete `http-server`) debido a su facilidad de instalación, su uso extendido en la industria y su excelente compatibilidad con proyectos basados en tecnologías web.
*   **Producto de prueba (Plantilla HTML):** Se seleccionó una plantilla gratuita tipo *Landing Page* descargada desde un repositorio público (por ejemplo, desde *Start Bootstrap* o el enlace sugerido en la guía).

---

## 3. PASO A PASO: INSTALACIÓN DEL SERVIDOR Y DESPLIEGUE (DOCUMENTACIÓN VISUAL)

A continuación, se describen los pasos realizados para montar el servidor y desplegar la plantilla web. 

### Paso 3.1. Descarga de la plantilla HTML
Se procedió a buscar y descargar una plantilla web en formato `.zip`. Una vez descargada, se descomprimió el archivo para exponer los archivos `index.html`, carpetas de `css`, `js`, y `assets`.

> **[INSERTA AQUÍ CAPTURA DE PANTALLA 1]** 
> *(Descripción de la imagen: Archivos de la plantilla HTML descomprimidos en el explorador de archivos).*

### Paso 3.2. Instalación y configuración del Servidor Local
*(Si usas XAMPP)*: Se descargó el instalador de XAMPP desde su página oficial. Tras la instalación, se abrió el Panel de Control de XAMPP y se inició el módulo **Apache**. El indicador en verde confirmó que el servidor local estaba corriendo por el puerto 80.
*(Si usas Node.js)*: Desde la terminal de comandos, verificamos la instalación de Node.js y se instaló el paquete de servidor local ejecutando el comando `npm install -g http-server`.

> **[INSERTA AQUÍ CAPTURA DE PANTALLA 2]** 
> *(Descripción de la imagen: Panel de XAMPP con Apache encendido en verde, o Terminal mostrando el comando de instalación del servidor).*

### Paso 3.3. Montaje (Deploy) de la plantilla en el servidor
Para desplegar la aplicación, se movieron los archivos descomprimidos de la plantilla a la carpeta pública del servidor local. 
*(Si usas XAMPP)*: Los archivos se copiaron dentro del directorio `C:\xampp\htdocs\plantilla_prueba`.
*(Si usas Node.js)*: Se abrió la terminal directamente en la carpeta de la plantilla descomprimida y se ejecutó el comando `http-server -c-1`.

> **[INSERTA AQUÍ CAPTURA DE PANTALLA 3]** 
> *(Descripción de la imagen: Archivos copiados dentro de la carpeta htdocs de XAMPP, o terminal ejecutando el servidor en el directorio del proyecto).*

### Paso 3.4. Ejecución y validación en el navegador del cliente
Finalmente, para comprobar que la aplicación web fue desplegada correctamente, se abrió un navegador web (Google Chrome/Edge) y se ingresó a la dirección local del servidor: `http://localhost/plantilla_prueba` (o `http://localhost:8080`). La plantilla HTML cargó exitosamente, demostrando que el servidor web local está interpretando y sirviendo los archivos correctamente.

> **[INSERTA AQUÍ CAPTURA DE PANTALLA 4]** 
> *(Descripción de la imagen: Navegador web mostrando la plantilla HTML funcionando bajo la URL de localhost).*

---

## 4. CONCLUSIÓN

El ejercicio de montaje y despliegue local permitió comprender de forma práctica la arquitectura cliente-servidor. Se logró instalar satisfactoriamente una plataforma de servidor local, configurar su directorio de ejecución y servir archivos estáticos (HTML/CSS) simulando un entorno de producción. Esta práctica garantiza que, como desarrolladores, contamos con las competencias necesarias para implantar soluciones de software en los equipos o plataformas de los clientes, asegurando su disponibilidad a través de la red local.

---

## 5. BIBLIOGRAFÍA / WEBGRAFÍA

*   Material de formación SENA: "Plataformas de desarrollo e implantación de aplicaciones".
*   Plantilla HTML gratuita utilizada: [Coloca aquí el nombre y el Link de donde descargaste la plantilla].
*   Documentación oficial de [XAMPP / Node.js]: [Coloca aquí el link oficial, ej: https://www.apachefriends.org/es/index.html]
