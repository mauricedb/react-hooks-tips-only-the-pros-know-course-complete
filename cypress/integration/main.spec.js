context("Main", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has the correct title", () => {
    cy.title().should("equal", "React Hooks Tips Only the Pros Know")
  })

  it("has the correct URL", () => {
    cy.title().should("equal", "React Hooks Tips Only the Pros Know")
    cy.location("pathname").should("equal", "/")
  })

  it("Can navigate to Person Editor", () => {
    cy.contains("Person Editor").click()
    cy.location("pathname").should("equal", "/person-editor")
    cy.contains("Person Editor").should("be.visible")
  })

  it("Can navigate to Rules of Hooks", () => {
    cy.contains("Rules of Hooks").click()
    cy.location("pathname").should("equal", "/counter")
    cy.contains("Count: 0").should("be.visible")
  })

  it("Can navigate to Kimrof", () => {
    cy.contains("Kimrof").click()
    cy.location("pathname").should("equal", "/kimrof-user-editor")
    cy.contains("Kimrof User Editor").should("be.visible")
  })

  it("Can navigate to Formik", () => {
    cy.contains("Formik")
      .should("be.visible")
      .should("have.attr", "href", "https://formik.org/docs/api/formik")
      .should("have.attr", "target", "formik")

    cy.contains("Formik").invoke("removeAttr", "target").click()

    cy.url().should("equal", "https://formik.org/docs/api/formik")
    cy.get("h1:first").should("have.text", "<Formik />")
  })
})
