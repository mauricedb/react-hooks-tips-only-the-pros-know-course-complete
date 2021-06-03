import localforage from "localforage"

context("The Person Editor", () => {
  beforeEach(() => {
    cy.visit("/person-editor").then(() => {
      localforage.clear()
    })
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
    cy.contains('"surname": "Lowery",').should("be.visible")
    cy.contains('"email": "fredalowery@hawkster.com",').should("be.visible")
    cy.contains('"balance": 1501.07,').should("be.visible")
    cy.contains('"address": "879 Sapphire Street, Wells, Texas, 8427",').should(
      "be.visible"
    )
    cy.contains('"phone": "(899) 456-3001"').should("be.visible")
  })

  it("Can rename to Jack Sparrow", () => {
    cy.contains('"firstname": "Freda",').should("be.visible")
    cy.contains('"surname": "Lowery",').should("be.visible")

    cy.get(".form-control").eq(0).clear().type("Jack")
    cy.get(".form-control").eq(1).clear().type("Sparrow")

    cy.contains('"firstname": "Jack",').should("be.visible")
    cy.contains('"surname": "Sparrow",').should("be.visible")
  })

  it("Can rename to Ford Prefect with side effect", () => {
    cy.contains('"firstname": "Freda",').should("be.visible")
    cy.contains('"surname": "Lowery",').should("be.visible")
    cy.contains('"address": "879 Sapphire Street, Wells, Texas, 8427",').should(
      "be.visible"
    )

    cy.get(".form-control:first").clear().type("Ford")

    cy.contains('"firstname": "Ford",').should("be.visible")
    cy.contains('"surname": "Prefect",').should("be.visible")
    cy.contains('"address": "Outer space",').should("be.visible")
  })

  it("Is back to default after a reload when IndexedDB is cleared", () => {
    cy.contains('"firstname": "Freda",').should("be.visible")

    cy.get(".form-control:first").clear().type("Ford")

    cy.contains('"firstname": "Ford",').should("be.visible")

    cy.visit("/person-editor").then(() => {
      localforage.clear()
    })

    cy.contains('"firstname": "Freda",').should("be.visible")
  })

  it("Persists changes after a reload", () => {
    cy.contains('"firstname": "Freda",').should("be.visible")

    cy.get(".form-control:first").clear().type("Ford")

    cy.contains('"firstname": "Ford",').should("be.visible")

    cy.contains("React Hooks for pros").click()
    cy.contains('"firstname": "Ford",').should("not.exist")
    cy.contains("Person Editor").click()

    cy.contains('"firstname": "Ford",').should("be.visible")
  })
})
