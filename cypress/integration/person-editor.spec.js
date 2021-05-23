context("Person Editor", () => {
  beforeEach(() => {
    cy.visit("/person-editor")
  })

  it("Has the elements", () => {
    cy.get("h2").should("have.text", "Person Editor")
    cy.get(".form-group")
      .eq(0)
      .within(() => {
        cy.get(".form-label").should("have.text", "Firstname:")
        cy.get(".form-control").should("have.value", "Freda")
      })
    cy.get(".form-group")
      .eq(1)
      .within(() => {
        cy.get(".form-label").should("have.text", "Surname:")
        cy.get(".form-control").should("have.value", "Lowery")
      })
  })

  it("Has the JSON", () => {
    cy.contains('"id": 4,').should("be.visible")
    cy.contains('"firstname": "Freda",').should("be.visible")
    cy.contains('"email": "fredalowery@hawkster.com",').should("be.visible")
    cy.contains('"balance": 1501.07,').should("be.visible")
    cy.contains('"address": "879 Sapphire Street, Wells, Texas, 8427",').should(
      "be.visible"
    )
    cy.contains('"phone": "(899) 456-3001"').should("be.visible")
  })
})
