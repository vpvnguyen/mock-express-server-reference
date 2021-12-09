const { isMock, standardResponses } = require("../../src/mockServerResponses");

const HOME_URL = "/";
const QUERY_URL = "/query";
const PARAMS_URL = "/params/params";
const POST_URL = "/post";

const seedResponses = {
  [HOME_URL]: {
    status: 200,
    data: {
      message: "HOME_URL SEEDED RESPONSE",
    },
  },
  [QUERY_URL]: {
    status: 200,
    data: {
      message: "QUERY_URL SEEDED RESPONSE",
    },
  },
  [PARAMS_URL]: {
    status: 200,
    data: {
      message: "PARAMS_URL SEEDED RESPONSE",
    },
  },
  [POST_URL]: {
    status: 200,
    data: {
      message: "POST_URL SEEDED RESPONSE",
    },
  },
  ["/anythingIWant"]: {
    status: 200,
    data: {
      message: "ANY DATA I WANT",
    },
  },
};

describe("Standard Responses", () => {
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
    cy.get("#getResponse").should(
      "have.text",
      standardResponses[HOME_URL].data.message
    );
  });

  it("Have value after submitting POST request", () => {
    cy.intercept("POST", "http://localhost:9001/post").as("postResponse");
    cy.get("button#postButton").click();
    cy.wait("@postResponse");
    cy.get("#postResponse").should(
      "have.text",
      standardResponses[POST_URL].data.message
    );
  });

  it("Have value after submitting QUERY request", () => {
    cy.intercept("GET", "http://localhost:9001/query").as("queryReponse");
    cy.get("button#queryButton").click();
    cy.wait("@queryReponse");
    cy.get("#queryResponse").should(
      "have.text",
      standardResponses[QUERY_URL].data.message
    );
  });

  it("Have value after submitting PARAMS request", () => {
    cy.intercept("POST", "http://localhost:9001/params/params").as(
      "paramsResponse"
    );
    cy.get("button#paramsButton").click();
    cy.wait("@paramsResponse");
    cy.get("#paramsResponse").should(
      "have.text",
      standardResponses[PARAMS_URL].data.message
    );
  });
});

describe("Mock and Reset", () => {
  // preload data onto the server
  // overwrite preloaded data with seed data
  // reset the data back to preloaded data

  if (isMock) {
    before(() => {
      cy.request("POST", "http://localhost:9001/seed", {
        ...seedResponses,
      });
    });

    after(() => {
      cy.request("POST", "http://localhost:9001/seed/reset");
    });
  }

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
    cy.get("#getResponse").should(
      "have.text",
      seedResponses[HOME_URL].data.message
    );
  });

  it("Have value after submitting POST request", () => {
    cy.intercept("POST", "http://localhost:9001/post").as("postResponse");
    cy.get("button#postButton").click();
    cy.wait("@postResponse");
    cy.get("#postResponse").should(
      "have.text",
      seedResponses[POST_URL].data.message
    );
  });

  it("Have value after submitting QUERY request", () => {
    cy.intercept("GET", "http://localhost:9001/query").as("queryReponse");
    cy.get("button#queryButton").click();
    cy.wait("@queryReponse");
    cy.get("#queryResponse").should(
      "have.text",
      seedResponses[QUERY_URL].data.message
    );
  });

  it("Have value after submitting PARAMS request", () => {
    cy.intercept("POST", "http://localhost:9001/params/params").as(
      "paramsResponse"
    );
    cy.get("button#paramsButton").click();
    cy.wait("@paramsResponse");
    cy.get("#paramsResponse").should(
      "have.text",
      seedResponses[PARAMS_URL].data.message
    );
  });
});

// describe("Mock Seed - No Reset", () => {
//   if (isMock) {
//     before(() => {
//       cy.request("POST", "http://localhost:9001/seed", {
//         ...seedResponses,
//       });
//     });
//   }

//   it("Visits React App", () => {
//     cy.visit("http://localhost:3000/");
//   });

//   it("Have empty response values", () => {
//     cy.get("#getResponse").should("be.empty");
//     cy.get("#postResponse").should("be.empty");
//     cy.get("#paramsResponse").should("be.empty");
//     cy.get("#queryResponse").should("be.empty");
//   });

//   it("Have value after submitting GET request", () => {
//     cy.intercept("GET", "http://localhost:9001/").as("getResponse");
//     cy.get("button#getButton").click();
//     cy.wait("@getResponse");
//     cy.get("#getResponse").should(
//       "have.text",
//       seedResponses[HOME_URL].data.message
//     );
//   });

//   it("Have value after submitting POST request", () => {
//     cy.intercept("POST", "http://localhost:9001/post").as("postResponse");
//     cy.get("button#postButton").click();
//     cy.wait("@postResponse");
//     cy.get("#postResponse").should(
//       "have.text",
//       seedResponses[POST_URL].data.message
//     );
//   });

//   it("Have value after submitting QUERY request", () => {
//     cy.intercept("GET", "http://localhost:9001/query").as("queryReponse");
//     cy.get("button#queryButton").click();
//     cy.wait("@queryReponse");
//     cy.get("#queryResponse").should(
//       "have.text",
//       seedResponses[QUERY_URL].data.message
//     );
//   });

//   it("Have value after submitting PARAMS request", () => {
//     cy.intercept("POST", "http://localhost:9001/params/params").as(
//       "paramsResponse"
//     );
//     cy.get("button#paramsButton").click();
//     cy.wait("@paramsResponse");
//     cy.get("#paramsResponse").should(
//       "have.text",
//       seedResponses[PARAMS_URL].data.message
//     );
//   });
// });

// describe("Mock Standard - No Reset", () => {
//   it("Visits React App", () => {
//     cy.visit("http://localhost:3000/");
//   });

//   it("Have empty response values", () => {
//     cy.get("#getResponse").should("be.empty");
//     cy.get("#postResponse").should("be.empty");
//     cy.get("#paramsResponse").should("be.empty");
//     cy.get("#queryResponse").should("be.empty");
//   });

//   it("Have value after submitting GET request", () => {
//     cy.intercept("GET", "http://localhost:9001/").as("getResponse");
//     cy.get("button#getButton").click();
//     cy.wait("@getResponse");
//     cy.get("#getResponse").should(
//       "have.text",
//       standardResponses[HOME_URL].data.message
//     );
//   });

//   it("Have value after submitting POST request", () => {
//     cy.intercept("POST", "http://localhost:9001/post").as("postResponse");
//     cy.get("button#postButton").click();
//     cy.wait("@postResponse");
//     cy.get("#postResponse").should(
//       "have.text",
//       standardResponses[POST_URL].data.message
//     );
//   });

//   it("Have value after submitting QUERY request", () => {
//     cy.intercept("GET", "http://localhost:9001/query").as("queryReponse");
//     cy.get("button#queryButton").click();
//     cy.wait("@queryReponse");
//     cy.get("#queryResponse").should(
//       "have.text",
//       standardResponses[QUERY_URL].data.message
//     );
//   });

//   it("Have value after submitting PARAMS request", () => {
//     cy.intercept("POST", "http://localhost:9001/params/params").as(
//       "paramsResponse"
//     );
//     cy.get("button#paramsButton").click();
//     cy.wait("@paramsResponse");
//     cy.get("#paramsResponse").should(
//       "have.text",
//       standardResponses[PARAMS_URL].data.message
//     );
//   });
// });
