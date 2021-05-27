context("Theme", () => {
  beforeEach(() => {
    cy.visit("/counter")
  })

  it("It starts in normal mode without style", () => {
    cy.contains("Cursive").should("be.visible")
    cy.get(".container").should("not.have.attr", "style")
  })

  it("We can switch to cursive", () => {
    cy.contains("Cursive").click()
    cy.contains("Normal").should("be.visible")
    cy.get(".container").should("have.attr", "style", "font-family: cursive;")
  })

  it("We can switch to cursive and back", () => {
    cy.contains("Cursive").click()
    cy.get(".container").should("have.attr", "style", "font-family: cursive;")
    cy.contains("Normal").click()
    cy.contains("Cursive").should("be.visible")
    cy.get(".container").should("have.attr", "style", "font-family: inherit;")
  })
})
