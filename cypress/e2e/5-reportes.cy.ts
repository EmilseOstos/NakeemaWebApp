describe('Caso 005: Generación de reporte de ventas', () => {
  it('Verificar visualización de reportes', () => {
    cy.visit('/dashboard/admin/reportes');
    cy.wait(1000);
    
    // Verificamos estado inicial del módulo
    cy.get('[data-testid="mensaje-vacio"]').should('be.visible');
    cy.wait(1000);
    
    cy.get('[data-testid="btn-descargar-reportes"]').click({ force: true });
    cy.wait(2000);
  });
});
