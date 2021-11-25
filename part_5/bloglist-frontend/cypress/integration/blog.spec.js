describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-button')
      .should('contain', 'Log in')
  })

  describe('Login',function() {
    let user

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      user = {
        name: 'Eamon',
        username: 'eamon',
        password: 'password'
      }
      cy.createUser(user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.login({ username: user.username, password: user.password })
      cy.contains('eamon logged in')
    })

    it('fails with wrong credentials', function() {
      cy.login({ username: user.username, password: 'wrong', failOnStatusCode: false})
      cy.contains('wrong credentials')
    })
  })
})