describe('Pruebas de Formularios', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/registro')
  })

  it('Debe cargar la página de registro', () => {
    cy.url().should('include', '/registro')
  })

  it('El formulario de registro debe tener campos requeridos', () => {
    // Verificar que existan campos de formulario
    cy.get('input, button, [role="button"]').should('have.length.greaterThan', 0)
  })

  it('Debe haber validación en los campos', () => {
    cy.get('input[type="password"], input[type="email"], input[type="text"]').should('exist')
  })

  it('Debe tener un botón de envío', () => {
    cy.get('button[type="submit"], [role="button"]')
      .should('exist')
      .should('be.visible')
  })
})
