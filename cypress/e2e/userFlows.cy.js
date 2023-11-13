describe('Displays data on pageload', () => {
  beforeEach(() => {
    const fixedDate = new Date('2023-11-12T12:00:00Z');
    const timeZone = 'America/Los_Angeles';
    cy.clock(fixedDate.getTime(), {timeZone: timeZone });
   cy.intercept('GET', 'https://teleology.foundation/movies/theaters', 
   {
    statusCode: 200,
    fixture:  'theaters'
   }).as('allTheaters');
   cy.intercept('GET', 'https://teleology.foundation/movies/wearebraindead', 
   {
    statusCode: 200,
    fixture:  'braindead'
   }).as('getBraindead');
   cy.intercept('GET', 'https://teleology.foundation/movies/vidiots', 
   {
    statusCode: 200,
    fixture:  'vidiots'
   }).as('getVidiots');
  });
  it('As a user when I open the app I can see a date input field, todays date, movie showtime cards, and the favorites button', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.date-display').contains('h1', 'Sunday Nov. 12')
    cy.get('form').contains('label', 'Select a date')
    cy.get('.card').should('have.length', 4 )
    .get('.card').first().contains('p', 'Brain Dead Studios')
    .get('.card').first().contains('p', 'Desperately Seeking: Sofia Coppola in the New Millenium – Lost in Translation')
    .get('.card').first().contains('p', '05:00 PM')
    cy.get('.cards-container div:nth-child(2)').contains('p', 'LA Loft Movie Club + NEWS FROM HOME' )
    cy.get('.cards-container div:nth-child(2)').contains('p', '07:30 PM' )
    cy.get('.cards-container div:nth-child(3)').contains('p', 'Spy Kids' )
    cy.get('.cards-container div:nth-child(3)').contains('p', '01:00 PM' )
    cy.get('.card').last().contains('p', 'Vidiots')
    .get('.card').last().contains('p', 'Gilda')
    .get('.card').last().contains('p', '03:30 PM')
    cy.get('.favorites-nav-btn').contains('favorited').click()
    cy.url().should('include', '/favorites')
    cy.get('.fav-title').contains('h1', 'Favorited')
  })
  it('Should have a favorites page.  The cards should have favoriting buttons to toggle a favorite feature.', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.favorites-nav-btn').contains('favorited').click()
    cy.url().should('include', '/favorites')
    cy.get('.fav-title').contains('h1', 'Favorited')
    cy.get('.favorited-message').contains('p', 'No favorites yet.')
    cy.get('.favorited-message').contains('p', 'When you save a movie it will appear here.')
    cy.get('.favorites-nav-btn').contains('back to home').click()
    cy.url().should('include', '/')
    cy.get('.favorites-btn').should('have.length', 4 )
    cy.get('.favorites-img').first().should('have.attr', 'alt').and('include', 'heart outline')
    cy.get('.favorites-btn').first().click()
    cy.get('.favorites-img').first().should('have.attr', 'alt').and('include', 'heart filled')
    cy.get('.favorites-btn').last().click()
    cy.get('.favorites-nav-btn').contains('favorited').click()
    cy.get('.fav-title').contains('h1', 'Favorited')
    cy.get('.card').should('have.length', 2 )
    cy.get('.card').first().contains('p', 'Desperately Seeking: Sofia Coppola in the New Millenium – Lost in Translation')
    cy.get('.card').last().contains('p', 'Gilda')
    cy.get('.favorites-btn').first().click()
    cy.get('.card').should('have.length', 1 )
  }
  )
  it('should handle a 404 error for a bad route.', ()=> {
    cy.visit('http://localhost:3000/')
    cy.visit('http://localhost:3000/nonsense')
    cy.get('.error-title').contains('h1', 'Woops! Page not found.')
    cy.get('.nav-btn').contains('back to home').click()
    cy.url().should('include', '/')
    cy.get('.date-display').contains('h1', 'Sunday Nov. 12')
    cy.visit('http://localhost:3000/favorites/nonsense')
    cy.get('.error-title').contains('h1', 'Woops! Page not found.')
    cy.get('.nav-btn').contains('back to home').click()
    cy.url().should('include', '/')
    cy.get('.date-display').contains('h1', 'Sunday Nov. 12')
  })
  it('should have a controlled form.  A user should not be able to enter a date before today or more than 30 days in the future.', ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('#date').type('2023-11-22').should('have.value', '2023-11-22').trigger('change')
    cy.get('.date-display').contains('h1', 'Wednesday Nov. 22')
    cy.get('.card').contains('p', 'Brain Dead Studios')
    cy.get('.card').contains('p', 'Anomalisa')
    cy.get('.card').contains('p', '07:00 PM')
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Please select a date on or before Dec. 12');
    });
    cy.get('#date').type('2024-01-01')
  })
  it('should prevent a user from entering a date in the past', () => {
    cy.visit('http://localhost:3000/')
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Please select a date in the future ☺');
    });
    cy.get('#date').type('2023-11-01')
  })
});
