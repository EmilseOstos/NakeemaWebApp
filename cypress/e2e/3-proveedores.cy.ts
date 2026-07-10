describe('Caso 003: Proveedores', () => {
  it('Verificar interacciones en el módulo de proveedores', () => {
    cy.visit('/dashboard/admin/proveedores');
    cy.wait(1000);
    // Probamos intento de guardado vacío para ver validaciones
    cy.get('[data-testid="btn-guardar"]').click();
    cy.get('[data-testid="error-alert"]').should('be.visible');
    cy.wait(1500);
    
    // Probamos la búsqueda
    cy.get('[data-testid="search-insumos"]').type('Corsair');
    cy.wait(1500);
    cy.get('[data-testid="tabla-proveedores"] tbody tr').should('have.length.at.least', 1);
    cy.wait(2000);
  });
});
