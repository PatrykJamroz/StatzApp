import React from "react";
import { User } from "./User";
import { SessionProviderMock } from "../../cypress/fixtures/SessionProviderMock";
const stravaData = require("../../cypress/fixtures/strava.json");

describe("<User />", () => {
  const mountComponent = (isSigned: boolean) =>
    cy.mount(
      <SessionProviderMock isSigned={isSigned}>
        <User athlete={stravaData.athlete} />
      </SessionProviderMock>
    );
  it("renders text when not signed in", () => {
    mountComponent(false);
    cy.contains("Not signed in").should("be.visible");
  });
  it("renders user data when signed", () => {
    mountComponent(true);

    cy.get('[data-cy="athleteImage"]').should("be.visible");
    cy.contains("Adam Malysz").should("be.visible");
    cy.contains("MG, Poland").should("be.visible");
    cy.contains("devthlete").should("be.visible");
    cy.contains("Strava account details:").should("be.visible");
    cy.contains("ID: 1").should("be.visible");
    cy.contains("Created at: Fri, 03 Feb 2023 23:00:00 GMT").should(
      "be.visible"
    );
  });
});

export {};
