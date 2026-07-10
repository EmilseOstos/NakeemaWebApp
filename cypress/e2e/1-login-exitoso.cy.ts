describe('Caso 001: Inicio de sesión exitoso', () => {
  it('Verificar acceso con credenciales válidas al dashboard', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('input[type="email"]').type('admin@nakeemaf.com');
    cy.wait(500);
    cy.get('input[type="password"]').type('Admin123*');
    cy.wait(500);
    cy.get('button[type="submit"]').click();
    cy.wait(3000);
  });
});
