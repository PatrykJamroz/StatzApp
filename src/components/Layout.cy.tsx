import { Layout } from "./Layout";
import { RouterProviderMock } from "../../cypress/fixtures/RouterProviderMock";
import { SessionProviderMock } from "../../cypress/fixtures/SessionProviderMock";

describe("<Layout />", () => {
  it("renders navbar and children", () => {
    cy.mount(
      <RouterProviderMock>
        <SessionProviderMock isSigned={true}>
          <Layout>Child</Layout>
        </SessionProviderMock>
      </RouterProviderMock>
    );
    cy.get('a[href*="/"]').should("contain.text", "User");
    cy.get('a[href*="/activities"]').should("contain.text", "Activities");
    cy.get('a[href*="/about"]').should("contain.text", "About");
    cy.contains("StatzApp").should("be.visible");
    cy.contains("Sign out").should("be.visible");
    cy.contains("Child").should("be.visible");
  });
});

export {};
