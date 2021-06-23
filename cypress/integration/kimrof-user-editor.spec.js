context("The Kimrof User Editor", () => {
  beforeEach(() => {
    cy.visit("/kimrof-user-editor")
  })

  it("Has the elements", () => {
    cy.get("h2").should("have.text", "Kimrof User Editor")
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

  it("Can rename to Jack Sparrow", () => {
    cy.contains('"firstname": "Freda",').should("be.visible")
    cy.contains('"surname": "Lowery",').should("be.visible")
    cy.contains("Save").should("be.disabled")

    cy.get(".form-control").eq(0).clear().type("Jack")
    cy.get(".form-control").eq(1).clear().type("Sparrow")

    cy.contains('"firstname": "Jack",').should("be.visible")
    cy.contains('"surname": "Sparrow",').should("be.visible")
    cy.contains("Save").should("be.enabled")
  })

  it("Disables the Save button on invalid data", () => {
    cy.contains("Save").should("be.disabled")
    cy.contains("The firstname is required!").should("not.exist")
    cy.contains("The surname is required!").should("not.exist")

    cy.get(".form-control").eq(2).clear().type("jack@sparrow.com")

    cy.contains("Save").should("be.enabled")

    cy.get(".form-control").eq(0).clear()
    cy.get(".form-control").eq(1).clear()

    cy.contains("Save").should("be.disabled")
    cy.contains("The firstname is required!").should("be.visible")
    cy.contains("The surname is required!").should("be.visible")
  })
})
