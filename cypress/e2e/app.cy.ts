describe("app", () => {
  beforeEach(() => {
    // Call your custom cypress command
    cy.login();
    // Visit a route in order to allow cypress to actually set the cookie
    cy.visit("/");
    // Wait until the intercepted request is ready
    cy.wait("@session");
  });
  it("should provide a valid session", () => {
    cy.get(".text-3xl")
      .should("exist")
      .then(() => {
        cy.log("Cypress login successful");
      });
  });
  it("should navigate", () => {
    cy.visit("/");

    cy.get('a[href*="activities"]').click();

    cy.url().should("include", "/activities");

    cy.get(".MuiDataGrid-root").should("be.visible");

    cy.get('a[href*="about"]').click();

    cy.url().should("include", "/about");

    cy.contains(
      "Welcome to StatzApp, a non-profit web application created for learning purposes. StatzApp is designed to help Strava users easily fetch and display their user data and activities in a simple and intuitive way."
    );
  });
});

export {};
