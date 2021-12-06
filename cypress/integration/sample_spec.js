describe("Happy Path", () => {
  it("Visits React App", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Have empty response values", () => {
    cy.get("#getResponse").should("be.empty");
    cy.get("#postResponse").should("be.empty");
    cy.get("#paramsResponse").should("be.empty");
    cy.get("#queryResponse").should("be.empty");
  });

  it("Have value after submitting GET request", () => {
    cy.intercept("GET", "http://localhost:9001/").as("getResponse");
    cy.get("button#getButton").click();
    cy.wait("@getResponse");
    cy.get("#getResponse").should("have.text", "Mock server up");
  });

  it("Have value after submitting POST request", () => {
    cy.intercept("POST", "http://localhost:9001/post").as("postResponse");
    cy.get("button#postButton").click();
    cy.wait("@postResponse");
    cy.get("#postResponse").should("have.text", "post success");
  });

  it("Have value after submitting QUERY request", () => {
    cy.intercept("GET", "http://localhost:9001/query?query=query").as(
      "queryReponse"
    );
    cy.get("button#queryButton").click();
    cy.wait("@queryReponse");
    cy.get("#queryResponse").should("have.text", "query success");
  });

  it("Have value after submitting PARAMS request", () => {
    cy.intercept("POST", "http://localhost:9001/params/params").as(
      "paramsResponse"
    );
    cy.get("button#paramsButton").click();
    cy.wait("@paramsResponse");
    cy.get("#paramsResponse").should("have.text", "params success");
  });
});
