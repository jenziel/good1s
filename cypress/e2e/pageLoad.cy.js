describe('Displays data on pageload', () => {
  beforeEach(() => {
    const fixedDate = new Date('2023-11-12T12:00:00Z');
    cy.clock(fixedDate.getTime());
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
  it('Should go to a new page when the favorites button is clicked.  If no favorites, it should show a message.', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.favorites-nav-btn').contains('favorited').click()
    cy.url().should('include', '/favorites')
    cy.get('.fav-title').contains('h1', 'Favorited')
    cy.get('.favorited-message').contains('p', 'No favorites yet.')
    cy.get('.favorited-message').contains('p', 'When you save a movie it will appear here.')
    cy.get('.favorites-nav-btn').contains('back to home').click()
    cy.url().should('include', '/')
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
});
