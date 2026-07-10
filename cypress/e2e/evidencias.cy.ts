describe('Evidencias SENA - NAKEEMAF', () => {

  it('1. Inicio de sesión (Login)', () => {
    // Visitamos la raíz asumiendo que ahí está el login (o /login si es la ruta real, 
    // pero si falla podemos ajustarlo, aquí asumimos que el usuario probará en la ruta correcta)
    // Para asegurar que funciona independientemente de la estructura real, usaremos cy.visit('/')
    // y si hay un form lo llenamos.
    cy.visit('/');
    
    // Pausa visual para el inicio del video
    cy.wait(1000);
    
    // Obtenemos los inputs asumiendo los selectores que ya había en tests previos
    cy.get('input[type="email"]').type('admin@nakeemaf.com');
    cy.wait(500); // Pausa visual para ver qué se escribió
    
    cy.get('input[type="password"]').type('Admin123*');
    cy.wait(500); // Pausa visual
    
    // Clic en el botón
    cy.get('button[type="submit"]').click();
    
    // Pausa visual al final
    cy.wait(2000);
  });

  it('2. Módulo Proveedores (Caso Rechazado - Formulario Vacío)', () => {
    cy.visit('/dashboard/admin/proveedores');
    cy.wait(1000);
    
    // No llenamos nada, directo al botón
    cy.get('[data-testid="btn-guardar"]').click();
    
    // Verificamos y mostramos la alerta de error
    cy.get('[data-testid="error-alert"]').should('be.visible');
    
    // Pausa visual para ver la alerta
    cy.wait(2000);
  });

  it('3. Módulo Proveedores (Caso Aprobado - Consulta de Insumos)', () => {
    cy.visit('/dashboard/admin/proveedores');
    cy.wait(1000);
    
    // Tabla inicial debe tener varios elementos
    cy.get('[data-testid="tabla-proveedores"] tbody tr').should('have.length.greaterThan', 1);
    
    // Escribimos en la barra de búsqueda
    cy.get('[data-testid="search-insumos"]').type('Corsair');
    cy.wait(1500); // Pausa para ver la búsqueda
    
    // La tabla debe filtrarse a 1 resultado
    cy.get('[data-testid="tabla-proveedores"] tbody tr').should('have.length', 1);
    cy.get('[data-testid="tabla-proveedores"]').contains('Corsair');
    
    cy.wait(2000);
  });

  it('4. Módulo Clientes (Caso En Seguimiento - Error Visual)', () => {
    cy.visit('/dashboard/admin/clientes');
    cy.wait(1000);
    
    // Llenamos el formulario
    cy.get('[data-testid="cliente-nombre"]').type('Carlos Andres');
    cy.wait(300);
    cy.get('[data-testid="cliente-email"]').type('carlos@ejemplo.com');
    cy.wait(300);
    cy.get('[data-testid="cliente-telefono"]').type('3001234567');
    cy.wait(500);
    
    // Clic en guardar
    cy.get('[data-testid="btn-guardar-cliente"]').click();
    
    // Esperamos el tiempo del setTimeout (500ms) más un poco para evidenciar
    cy.wait(1500);
    
    // Comprobamos que se borraron pero NO hay mensaje
    cy.get('[data-testid="cliente-nombre"]').should('have.value', '');
    // No hay validación de alerta verde porque intencionalmente no la pusimos
    
    cy.wait(1000);
  });

  it('5. Módulos Pendientes (Reportes)', () => {
    cy.visit('/dashboard/admin/reportes');
    cy.wait(1000);
    
    // Verificamos mensaje de que está vacío
    cy.get('[data-testid="mensaje-vacio"]').should('be.visible');
    cy.wait(1000);
    
    // Intentamos dar clic en el botón de descargar reportes (debe estar deshabilitado)
    cy.get('[data-testid="btn-descargar-reportes"]').should('be.disabled');
    // Forzamos clic para que el mouse intente hacerlo en el video
    cy.get('[data-testid="btn-descargar-reportes"]').click({ force: true });
    
    cy.wait(2000);
  });

});
