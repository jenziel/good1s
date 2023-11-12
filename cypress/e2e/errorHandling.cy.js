describe('Displays data on pageload', () => {
  beforeEach(() => {
    const fixedDate = new Date('2023-11-12T12:00:00Z');
    cy.clock(fixedDate.getTime());
   cy.intercept('GET', 'https://teleology.foundation/movies/theaters', 
   {
    statusCode: 500,
    body:  'theaters'
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
  })
  
});
