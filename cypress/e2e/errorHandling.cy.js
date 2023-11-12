describe("Should render error component when the server is down", () => {
  beforeEach(() => {
    const fixedDate = new Date("2023-11-12T12:00:00Z");
    cy.clock(fixedDate.getTime());
    cy.intercept("GET", "https://teleology.foundation/movies/theaters", {
      statusCode: 500,
      fixture: "errorResponse",
    }).as("Error1");
    cy.intercept("GET", "https://teleology.foundation/movies/wearebraindead", {
      statusCode: 200,
      fixture: "braindead",
    }).as("success1");
    cy.intercept("GET", "https://teleology.foundation/movies/vidiots", {
      statusCode: 200,
      fixture: "vidiots",
    }).as("success2");
  });
  it("should display an error message if the server to a get all theates is down. It should reset the error state when a user navigates away", () => {
    cy.visit('http://localhost:3000/')
    cy.wait('@Error1')
    cy.get('.page-title').contains('Unable to get theater info. Internal Server Error')
    const isServerDown = true;
    if (isServerDown) {
      cy.intercept('GET', 'https://teleology.foundation/movies/theaters', {
        statusCode: 200,
        fixture: 'theaters',
      }).as('secondRequest');
      cy.get('.nav-btn').click()
      cy.wait('@secondRequest')
      cy.get('.date-display').contains('h1', 'Sunday Nov. 12')
      cy.url().should('include', '/')
    } else {
      cy.wait('@success1')
    }
   
  });
  
});

describe("Should render error component when the server is down", () => {
  beforeEach(() => {
    const fixedDate = new Date("2023-11-12T12:00:00Z");
    cy.clock(fixedDate.getTime());
    cy.intercept("GET", "https://teleology.foundation/movies/theaters", {
      statusCode: 200,
      fixture: "theaters",
    }).as("getTheaters");
    cy.intercept("GET", "https://teleology.foundation/movies/wearebraindead", {
      statusCode: 500,
      fixture: "errorResponse",
    }).as("failedFetch1");
    cy.intercept("GET", "https://teleology.foundation/movies/vidiots", {
      statusCode: 200,
      fixture: "vidiots",
    }).as("successfulFetch1");
  });
  it("In the rare case that one endpoint returns a 500 and the others do not, it should display everything else as planned", () => {
    cy.visit('http://localhost:3000/')
    cy.wait('@getTheaters')
    cy.get('.date-display').contains('h1', 'Sunday Nov. 12')
    cy.get('form').contains('label', 'Select a date')
    cy.get('.card').should('have.length', 2 )
    .get('.card').first().contains('p', 'Vidiots')
    .get('.card').first().contains('p', 'Spy Kids' )
    .get('.card').first().contains('p', '04:00 PM')
    cy.get('.card').last().contains('p', 'Vidiots')
    .get('.card').last().contains('p', 'Gilda')
    .get('.card').last().contains('p', '06:30 PM')
  });
  
});

