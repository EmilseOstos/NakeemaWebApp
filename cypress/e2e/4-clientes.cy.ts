describe('Caso 004: Registro de cliente', () => {
  it('Verificar creación de un cliente nuevo', () => {
    cy.visit('/dashboard/admin/clientes');
    cy.wait(1000);
    
    cy.get('[data-testid="cliente-nombre"]').type('Carlos Andres');
    cy.wait(300);
    cy.get('[data-testid="cliente-email"]').type('carlos@ejemplo.com');
    cy.wait(300);
    cy.get('[data-testid="cliente-telefono"]').type('3001234567');
    cy.wait(500);
    
    cy.get('[data-testid="btn-guardar-cliente"]').click();
    cy.wait(2500);
  });
});
