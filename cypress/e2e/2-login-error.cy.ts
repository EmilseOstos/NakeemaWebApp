describe('Caso 002: Inicio de sesión con error', () => {
  it('Verificar rechazo del sistema con contraseña incorrecta', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('input[type="email"]').type('admin@nakeemaf.com');
    cy.wait(500);
    cy.get('input[type="password"]').type('claveMala123');
    cy.wait(500);
    cy.get('button[type="submit"]').click();
    cy.wait(3000); // Pausa para que el video grabe el mensaje de error en pantalla
  });
});
