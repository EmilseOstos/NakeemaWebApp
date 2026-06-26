describe('Página de inicio - Prueba E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Debe cargar la página de inicio correctamente', () => {
    cy.title().should('include', 'NAKEEMAF')
    cy.get('body').should('be.visible')
  })

  it('Debe contener elementos principales', () => {
    cy.get('header').should('exist')
    cy.get('main').should('exist')
  })

  it('Debe tener navegación visible', () => {
    // Verificar que exista el sidebar o topbar
    cy.get('[class*="Sidebar"], [class*="Topbar"]').should('exist')
  })

  it('Debe ser responsivo', () => {
    cy.viewport('iphone-x')
    cy.get('body').should('be.visible')
    
    cy.viewport('ipad-2')
    cy.get('body').should('be.visible')
  })
})
